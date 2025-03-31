import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { MoreVertical } from 'lucide-react';
import React from 'react'

function TodoTab() {
  return (
    <TabsContent value="kanban" className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* To Do Column */}
        <Card className="border-t-4 border-t-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">To Do</h3>
            <Badge variant="outline" className="text-xs font-normal">
              5 Tasks
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={`todo-${i}`} className="p-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Implement Feature</h4>
                    <div className="text-xs text-muted-foreground">
                      Due: Today
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assignee: Person X
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Ongoing Column */}
        <Card className="border-t-4 border-t-blue-200 bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">Ongoing</h3>
            <Badge variant="outline" className="text-xs font-normal">
              2 Tasks
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {[1, 2].map((i) => (
              <Card key={`ongoing-${i}`} className="p-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Implement Feature</h4>
                    <div className="text-xs text-muted-foreground">
                      Due: Today
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assignee: Person X
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Done Column */}
        <Card className="border-t-4 border-t-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">Done</h3>
            <Badge variant="outline" className="text-xs font-normal">
              4 Tasks
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={`done-${i}`} className="p-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Implement Feature</h4>
                    <div className="text-xs text-muted-foreground">
                      Due: Today
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assignee: Person X
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

export default TodoTab