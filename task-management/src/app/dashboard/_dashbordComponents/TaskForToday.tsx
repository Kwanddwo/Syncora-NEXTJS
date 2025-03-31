import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import React from 'react'

function TaskForToday() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Your tasks for today</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Throw Trash</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-gray-100">
                  To do
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  Medium
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pay rent</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800"
                >
                  Done
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Make report</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Ongoing
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-red-500 hover:bg-red-600">High</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default TaskForToday