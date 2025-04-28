import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Clean existing data if needed
  await cleanDatabase();

  // Create users with hashed passwords
  const users = await createUsers();

  // Create user preferences
  await createUserPreferences(users);

  // Create workspaces
  const workspaces = await createWorkspaces(users);

  // Create workspace members
  await createWorkspaceMembers(users, workspaces);

  // Create tasks
  const tasks = await createTasks(users, workspaces);

  // Create task assignees
  await createTaskAssignees(users, tasks);

  // Create activity logs
  await createActivityLogs(users, workspaces, tasks);

  // Create recent workspaces
  await createRecentWorkspaces(users, workspaces);

  // Create inbox notifications
  await createInboxNotifications(users, workspaces);

  // Create workspace invites
  await createWorkspaceInvites(users, workspaces);

  console.log("Seeding completed successfully!");
}

async function cleanDatabase() {
  // Delete in the correct order to respect foreign key constraints
  console.log("Cleaning existing data...");

  await prisma.workspaceInvite.deleteMany({});
  await prisma.inbox.deleteMany({});
  await prisma.RecentWorkspace.deleteMany({}); // Corrected to uppercase R
  await prisma.userActivity.deleteMany({});
  await prisma.taskActivity.deleteMany({});
  await prisma.workspaceActivity.deleteMany({});
  await prisma.taskAssignee.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.recurringTask.deleteMany({});
  await prisma.workspaceMember.deleteMany({});
  await prisma.workspace.deleteMany({});
  await prisma.userPreferences.deleteMany({});
  await prisma.user.deleteMany({});
}

async function createUsers() {
  console.log("Creating users...");

  // Create a super admin
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      name: "Admin",
      lastName: "User",
      role: "Super",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  });

  // Create regular users
  const regularUsers = await Promise.all(
    Array.from({ length: 5 }).map(async (_, index) => {
      return prisma.user.create({
        data: {
          email: `user${index + 1}@example.com`,
          password: await bcrypt.hash("password123", 10),
          name: `User${index + 1}`,
          lastName: `LastName${index + 1}`,
          role: "Regular",
          avatarUrl: `https://randomuser.me/api/portraits/men/${index + 2}.jpg`,
        },
      });
    })
  );

  return [adminUser, ...regularUsers];
}

async function createUserPreferences(users) {
  console.log("Creating user preferences...");

  return await Promise.all(
    users.map((user, index) => {
      return prisma.userPreferences.create({
        data: {
          userId: user.id,
          theme: index % 2 === 0 ? "light" : "dark",
          notifications: true,
          emailNotifications: index % 3 === 0,
          taskReminders: true,
          taskAssignmentAlerts: true,
          privacyProfileVisibility: true,
          privacyLastSeen: index % 2 === 0,
          taskAutoAccept: index === 0, // Only admin auto-accepts tasks
          defaultTaskPriority: ["low", "medium", "high"][index % 3],
        },
      });
    })
  );
}

async function createWorkspaces(users) {
  console.log("Creating workspaces...");

  // Create personal workspace for each user
  const personalWorkspaces = await Promise.all(
    users.map((user) => {
      return prisma.workspace.create({
        data: {
          name: `${user.name}'s Personal Workspace`,
          description: "Personal workspace for individual tasks",
          ownerId: user.id,
          isPersonal: true,
          icon: "👤",
        },
      });
    })
  );

  // Create shared workspaces
  const sharedWorkspaces = await Promise.all([
    prisma.workspace.create({
      data: {
        name: "Marketing Team",
        description: "Workspace for marketing team projects",
        ownerId: users[0].id,
        icon: "📈",
      },
    }),
    prisma.workspace.create({
      data: {
        name: "Development Team",
        description: "Workspace for development projects",
        ownerId: users[1].id,
        icon: "💻",
      },
    }),
    prisma.workspace.create({
      data: {
        name: "Design Team",
        description: "Workspace for design projects",
        ownerId: users[2].id,
        icon: "🎨",
      },
    }),
  ]);

  return [...personalWorkspaces, ...sharedWorkspaces];
}

async function createWorkspaceMembers(users, workspaces) {
  console.log("Creating workspace members...");

  const memberships = [];

  // For personal workspaces, only add the owner
  for (let i = 0; i < users.length; i++) {
    memberships.push({
      workspaceId: workspaces[i].id,
      userId: users[i].id,
      role: "admin",
    });
  }

  // For shared workspaces, add multiple members with different roles
  const sharedWorkspaceStartIdx = users.length;

  // Marketing Team (first shared workspace)
  memberships.push(
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx].id,
      userId: users[0].id,
      role: "admin",
    },
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx].id,
      userId: users[1].id,
      role: "member",
      invitedById: users[0].id,
    },
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx].id,
      userId: users[2].id,
      role: "viewer",
      invitedById: users[0].id,
    }
  );

  // Development Team (second shared workspace)
  memberships.push(
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx + 1].id,
      userId: users[1].id,
      role: "admin",
    },
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx + 1].id,
      userId: users[0].id,
      role: "member",
      invitedById: users[1].id,
    },
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx + 1].id,
      userId: users[3].id,
      role: "member",
      invitedById: users[1].id,
    }
  );

  // Design Team (third shared workspace)
  memberships.push(
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx + 2].id,
      userId: users[2].id,
      role: "admin",
    },
    {
      workspaceId: workspaces[sharedWorkspaceStartIdx + 2].id,
      userId: users[4].id,
      role: "member",
      invitedById: users[2].id,
    }
  );

  // Create all memberships
  await Promise.all(
    memberships.map((membership) => {
      return prisma.workspaceMember.create({
        data: membership,
      });
    })
  );
}

async function createTasks(users, workspaces) {
  console.log("Creating tasks...");

  const tasks = [];
  // Using enum values directly instead of strings
  const statuses = ["pending", "in_progress", "completed"];
  const priorities = ["low", "medium", "high"];

  // Helper function to generate a date offset from today
  const dateOffset = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  // Create tasks for each workspace
  for (let i = 0; i < workspaces.length; i++) {
    const workspace = workspaces[i];
    const owner = users.find((u) => u.id === workspace.ownerId) || users[0];

    // Create 3 tasks per workspace
    for (let j = 0; j < 3; j++) {
      tasks.push(
        await prisma.task.create({
          data: {
            title: `Task ${j + 1} for ${workspace.name}`,
            description: `This is a ${priorities[j % 3]} priority task for ${
              workspace.name
            }`,
            // Use the proper enum values
            status: statuses[j % 3],
            priority: priorities[j % 3],
            workspaceId: workspace.id,
            createdById: owner.id,
            dueDate: dateOffset(j * 3 + 5), // Due dates staggered by 3 days
            priorityOrder: j,
          },
        })
      );
    }

    // Create a recurring task for each workspace
    await prisma.recurringTask.create({
      data: {
        title: `Weekly Update for ${workspace.name}`,
        description: "Regular team update meeting and status report",
        workspaceId: workspace.id,
        frequency: "weekly",
      },
    });
  }

  return tasks;
}

async function createTaskAssignees(users, tasks) {
  console.log("Creating task assignees...");

  const assignees = [];

  // Assign tasks to different users
  for (let i = 0; i < tasks.length; i++) {
    // Assign to the task creator and one more user
    const taskCreatorId = tasks[i].createdById;
    const otherUserId = users.find((u) => u.id !== taskCreatorId)?.id;

    if (otherUserId) {
      assignees.push(
        await prisma.taskAssignee.create({
          data: {
            taskId: tasks[i].id,
            userId: otherUserId,
            assignedById: taskCreatorId,
          },
        })
      );
    }

    // Also self-assign some tasks (only even-numbered tasks)
    if (i % 2 === 0) {
      assignees.push(
        await prisma.taskAssignee.create({
          data: {
            taskId: tasks[i].id,
            userId: taskCreatorId,
            assignedById: taskCreatorId,
          },
        })
      );
    }
  }

  return assignees;
}

async function createActivityLogs(users, workspaces, tasks) {
  console.log("Creating activity logs...");

  // Create user activities
  for (const user of users) {
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        action: "logged_in",
        details: { ip: "192.168.1.1", device: "Web Browser" },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    });

    await prisma.userActivity.create({
      data: {
        userId: user.id,
        action: "profile_updated",
        details: { fields: ["name", "avatarUrl"] },
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    });
  }

  // Create workspace activities
  for (const workspace of workspaces) {
    await prisma.workspaceActivity.create({
      data: {
        workspaceId: workspace.id,
        userId: workspace.ownerId,
        action: "created",
        details: { initialMembers: 1 },
      },
    });

    // Only for shared workspaces
    if (!workspace.isPersonal) {
      await prisma.workspaceActivity.create({
        data: {
          workspaceId: workspace.id,
          userId: workspace.ownerId,
          action: "member_added",
          details: { count: 2 },
        },
      });
    }
  }

  // Create task activities
  for (const task of tasks) {
    await prisma.taskActivity.create({
      data: {
        taskId: task.id,
        userId: task.createdById,
        action: "created",
        details: { priority: task.priority },
      },
    });

    if (task.status === "in_progress") {
      await prisma.taskActivity.create({
        data: {
          taskId: task.id,
          userId: task.createdById,
          action: "status_changed",
          details: { from: "pending", to: "in_progress" },
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        },
      });
    } else if (task.status === "completed") {
      await prisma.taskActivity.create({
        data: {
          taskId: task.id,
          userId: task.createdById,
          action: "status_changed",
          details: { from: "pending", to: "in_progress" },
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
      });

      await prisma.taskActivity.create({
        data: {
          taskId: task.id,
          userId: task.createdById,
          action: "status_changed",
          details: { from: "in_progress", to: "completed" },
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
      });
    }

    // Add a comment to some tasks
    if (task.id.charAt(0) < "f") {
      // Just a way to select some tasks randomly
      await prisma.taskActivity.create({
        data: {
          taskId: task.id,
          userId: task.createdById,
          action: "commented",
          details: {
            comment:
              "This is a comment on the task. We should discuss this further.",
          },
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        },
      });
    }
  }
}

async function createRecentWorkspaces(users, workspaces) {
  console.log("Creating recent workspaces...");

  const recentEntries = [];

  // Each user has viewed some workspaces recently
  for (const user of users) {
    // User's personal workspace
    const personalWorkspace = workspaces.find(
      (w) => w.ownerId === user.id && w.isPersonal
    );
    if (personalWorkspace) {
      recentEntries.push({
        userId: user.id,
        workspaceId: personalWorkspace.id,
        viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      });
    }

    // Some shared workspaces
    const sharedWorkspaces = workspaces
      .filter((w) => !w.isPersonal)
      .slice(0, 2);
    for (let i = 0; i < sharedWorkspaces.length; i++) {
      recentEntries.push({
        userId: user.id,
        workspaceId: sharedWorkspaces[i].id,
        viewedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000), // staggered days ago
      });
    }
  }

  // Create all recent workspace entries
  await Promise.all(
    recentEntries.map((entry) => {
      return prisma.RecentWorkspace.create({
        // Corrected to uppercase R
        data: entry,
      });
    })
  );
}

async function createInboxNotifications(users, workspaces) {
  console.log("Creating inbox notifications...");

  // Task assigned notifications
  for (const user of users) {
    await prisma.inbox.create({
      data: {
        userId: user.id,
        type: "task_assigned",
        message: "You have been assigned a new task",
        senderId: users[0].id, // Admin user as sender
        details: { taskId: "some-task-id", taskTitle: "Important Task" },
        read: false,
      },
    });

    // Task due soon notification
    await prisma.inbox.create({
      data: {
        userId: user.id,
        type: "task_due_soon",
        message: 'Task "Quarterly Report" is due in 2 days',
        details: {
          taskId: "some-task-id",
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        read: user.id === users[0].id, // Only read for admin
      },
    });

    // Admin announcement (only for non-admin users)
    if (user.role !== "Super") {
      await prisma.inbox.create({
        data: {
          userId: user.id,
          type: "admin_announcement",
          message: "System maintenance scheduled for this weekend",
          senderId: users[0].id, // Admin user
          details: { importance: "medium" },
          read: false,
        },
      });
    }
  }
}

async function createWorkspaceInvites(users, workspaces) {
  console.log("Creating workspace invites...");

  // Get shared workspaces
  const sharedWorkspaces = workspaces.filter((w) => !w.isPersonal);

  // Create some pending invites
  await prisma.workspaceInvite.create({
    data: {
      workspaceId: sharedWorkspaces[0].id,
      invitedUserId: users[5].id, // Last user
      inviteSenderId: users[0].id, // Admin
      status: "pending",
    },
  });

  // Create an accepted invite
  await prisma.workspaceInvite.create({
    data: {
      workspaceId: sharedWorkspaces[1].id,
      invitedUserId: users[4].id,
      inviteSenderId: users[1].id,
      status: "accepted",
    },
  });

  // Create a declined invite
  await prisma.workspaceInvite.create({
    data: {
      workspaceId: sharedWorkspaces[2].id,
      invitedUserId: users[3].id,
      inviteSenderId: users[2].id,
      status: "declined",
    },
  });
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('Clearing existing data...');
  // Delete child records before parents to prevent FK issues.
  await prisma.workspaceInvite.deleteMany();
  await prisma.inbox.deleteMany();
  await prisma.recentWorkspace.deleteMany();
  await prisma.userActivity.deleteMany();
  await prisma.workspaceActivity.deleteMany();
  await prisma.taskActivity.deleteMany();
  await prisma.taskAssignee.deleteMany();
  await prisma.recurringTask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.userPreferences.deleteMany();
  await prisma.user.deleteMany();
}

async function createUsers(count = 5) {
  console.log(`Creating ${count} users and preferences...`);
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
        password: faker.internet.password(),
        // role defaults to "Regular"
      },
    });
    // Create associated preferences for each user.
    await prisma.userPreferences.create({
      data: {
        userId: user.id,
        theme: faker.helpers.arrayElement(['light', 'dark']),
        notifications: faker.datatype.boolean(),
        emailNotifications: faker.datatype.boolean(),
        taskReminders: faker.datatype.boolean(),
        taskAssignmentAlerts: faker.datatype.boolean(),
        privacyProfileVisibility: faker.datatype.boolean(),
        privacyLastSeen: faker.datatype.boolean(),
        taskAutoAccept: faker.datatype.boolean(),
        defaultTaskPriority: faker.helpers.arrayElement(['low', 'medium', 'high']),
      },
    });
    users.push(user);
  }
  return users;
}

async function createWorkspaces(users) {
  console.log('Creating workspaces...');
  const workspaces = [];
  // For each user, create one workspace that they own.
  for (const user of users) {
    const workspace = await prisma.workspace.create({
      data: {
        name: `${user.name}'s Workspace`,
        description: faker.company.catchPhrase(),
        icon: faker.image.avatar(),
        ownerId: user.id,
      },
    });
    workspaces.push(workspace);
  }
  return workspaces;
}

async function createWorkspaceMembers(workspaces, users) {
  console.log('Creating workspace members...');
  // For each workspace, add every user as a member.
  for (const workspace of workspaces) {
    for (const user of users) {
      await prisma.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: user.id,
          role: 'member', // You may randomly set some as 'admin' or 'viewer'.
          joinedAt: faker.date.recent(),
        },
      });
    }
  }
}

async function createTasksAndRecurring(workspaces, users) {
  console.log('Creating tasks and recurring tasks for workspaces...');
  for (const workspace of workspaces) {
    // Create several tasks per workspace.
    for (let i = 0; i < 3; i++) {
      const task = await prisma.task.create({
        data: {
          title: faker.hacker.phrase(),
          description: faker.lorem.sentences(2),
          status: 'pending', // Other statuses: in_progress, completed.
          priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
          workspaceId: workspace.id,
          createdById: faker.helpers.arrayElement(users).id,
          dueDate: faker.date.soon(10),
          priorityOrder: faker.number.int({ min: 0, max: 10 }),
        },
      });
      // Create a couple task activities.
      await prisma.taskActivity.createMany({
        data: [
          {
            taskId: task.id,
            userId: task.createdById,
            action: 'created',
            details: { info: 'Task created' },
          },
          {
            taskId: task.id,
            userId: faker.helpers.arrayElement(users).id,
            action: 'updated',
            details: { info: 'Task updated with new info' },
          },
        ],
      });
      // Randomly assign one or more users as task assignees.
      const numberOfAssignees = faker.number.int({ min: 1, max: users.length });
      const assignees = faker.helpers.arrayElements(users, numberOfAssignees);
      for (const assignee of assignees) {
        await prisma.taskAssignee.create({
          data: {
            taskId: task.id,
            userId: assignee.id,
            // Optionally record who assigned them (using a random user).
            assignedById: faker.helpers.arrayElement(users).id,
          },
        });
      }
    }
    // Create one recurring task per workspace.
    await prisma.recurringTask.create({
      data: {
        title: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        workspaceId: workspace.id,
        frequency: faker.helpers.arrayElement(['daily', 'weekly', 'monthly', 'custom']),
      },
    });
  }
}

async function createWorkspaceActivities(workspaces, users) {
  console.log('Creating workspace activities...');
  for (const workspace of workspaces) {
    await prisma.workspaceActivity.create({
      data: {
        workspaceId: workspace.id,
        userId: faker.helpers.arrayElement(users).id,
        action: faker.helpers.arrayElement([
          'created',
          'updated',
          'deleted',
          'member_added',
          'member_removed',
          'role_changed'
        ]),
        details: { info: faker.lorem.sentence() },
      },
    });
  }
}

async function createUserActivities(users) {
  console.log('Creating user activities...');
  for (const user of users) {
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        action: faker.helpers.arrayElement([
          'logged_in',
          'logged_out',
          'profile_updated',
          'password_changed',
          'preferences_updated'
        ]),
        details: { info: faker.lorem.sentence() },
      },
    });
  }
}

async function createRecentWorkspaces(workspaces, users) {
  console.log('Creating recent workspace entries...');
  for (const user of users) {
    for (const workspace of workspaces) {
      await prisma.recentWorkspace.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          viewedAt: faker.date.recent(),
        },
      });
    }
  }
}

async function createInboxEntries(users) {
  console.log('Creating inbox entries...');
  // For each user, create a couple of inbox notifications.
  for (const user of users) {
    await prisma.inbox.createMany({
      data: [
        {
          userId: user.id,
          type: faker.helpers.arrayElement([
            'workspace_invite',
            'workspace_role_updated',
            'removed_from_workspace',
            'workspace_deleted',
            'task_assigned',
            'task_updated',
            'task_status_changed',
            'task_due_soon',
            'task_overdue',
            'task_comment_added',
            'admin_announcement',
            'generic'
          ]),
          message: faker.lorem.sentence(),
        },
        {
          userId: user.id,
          type: faker.helpers.arrayElement([
            'workspace_invite',
            'workspace_role_updated',
            'removed_from_workspace',
            'workspace_deleted',
            'task_assigned',
            'task_updated',
            'task_status_changed',
            'task_due_soon',
            'task_overdue',
            'task_comment_added',
            'admin_announcement',
            'generic'
          ]),
          message: faker.lorem.sentence(),
        },
      ],
    });
  }
}

async function createWorkspaceInvites(workspaces, users) {
  console.log('Creating workspace invites...');
  // For demonstration, create one invite per workspace by inviting a random user that is not the owner.
  for (const workspace of workspaces) {
    const possibleInvitees = users.filter(u => u.id !== workspace.ownerId);
    if (possibleInvitees.length) {
      const invitedUser = faker.helpers.arrayElement(possibleInvitees);
      await prisma.workspaceInvite.create({
        data: {
          workspaceId: workspace.id,
          invitedUserId: invitedUser.id,
          inviteSenderId: workspace.ownerId,
          status: 'pending', // Other statuses: accepted, declined.
        },
      });
    }
  }
}

async function main() {
  try {
    await clearDatabase();

    const users = await createUsers();
    const workspaces = await createWorkspaces(users);

    await createWorkspaceMembers(workspaces, users);
    await createTasksAndRecurring(workspaces, users);
    await createWorkspaceActivities(workspaces, users);
    await createUserActivities(users);
    await createRecentWorkspaces(workspaces, users);
    await createInboxEntries(users);
    await createWorkspaceInvites(workspaces, users);

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
*/
