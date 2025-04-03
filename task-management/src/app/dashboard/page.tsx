import RecentWorkspaces from "./_dashbordComponents/RecentWorkspaces";
import TaskForToday from "./_dashbordComponents/TaskForToday";
import ActiveWorkspaces from "./_dashbordComponents/ActiveWorkspaces";
import Calendar from "./_dashbordComponents/CalendarSection";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
        {/* Recent Workspaces */}
        <RecentWorkspaces />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Your tasks for today */}
          <TaskForToday />

          {/* Active Workspaces */}
          <ActiveWorkspaces />
        </div>

        {/* Calendar */}
        <Calendar />
 
    </div>
  );
}
