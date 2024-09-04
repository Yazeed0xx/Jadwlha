import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Save, FileText, X } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-toastify';

export default function ScheduleModal({ taskList, isOpen, onClose }) {

  const saveTasksToDatabase = async (scheduledTasks) => {
    try {
      const response = await fetch('/api/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduledTasks),
      });
  
      if (response.ok) {
        const result = await response.json();
        toast.success('Tasks scheduled successfully!');
      } else {
        toast.error('Failed to schedule tasks.');
      }
    } catch (error) {
      console.error('Error saving tasks:', error);
      toast.error('An error occurred while saving tasks.');
    }
  };

  const handleSaveTasks = async () => {
    await saveTasksToDatabase(taskList);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Schedule Details', 20, 20);

    const tableColumn = ["Address", "Deadline", "Best Time Departure", "Best Route", "Distance", "Duration", "Day"];
    const tableRows = [];

    taskList.forEach(task => {
      const taskData = [
        task.address,
        task.arrivalTime?.toLocaleString() || 'N/A',
        task.departureTime?.toLocaleString() || 'N/A',
        task.routeDetails?.bestRoute || 'N/A',
        task.routeDetails?.distance || 'N/A',
        task.routeDetails?.duration || 'N/A',
        task.routeDetails?.day || 'N/A'
      ];
      tableRows.push(taskData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('schedule-details.pdf');
  };

  return (
    <Dialog open={isOpen} >
      <DialogContent  className="">
        <DialogHeader >
          <DialogTitle>تفاصيل الجدول</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان وجهتك</TableHead>
              <TableHead>اخر موعد لجدولة الرحله</TableHead>
              <TableHead>افضل وقت للخروج</TableHead>
              <TableHead>افضل طريق</TableHead>
              <TableHead>المسافه</TableHead>
              <TableHead>المده الزمنيه</TableHead>
              <TableHead>اليوم</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskList.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.address}</TableCell>
                <TableCell>{task.arrivalTime?.toLocaleString()}</TableCell>
                <TableCell>{task.departureTime?.toLocaleString()}</TableCell>
                <TableCell>{task.routeDetails?.bestRoute}</TableCell>
                <TableCell>{task.routeDetails?.distance}</TableCell>
                <TableCell>{task.routeDetails?.duration}</TableCell>
                <TableCell>{task.routeDetails?.day}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={handleSaveTasks}>
            <Save className="mr-2 h-4 w-4" />
            حفظ في الجدول في الملف الشخصي
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={onClose} variant="outline">
            <X   className="mr-2 h-4 w-4" />
            اغلق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
