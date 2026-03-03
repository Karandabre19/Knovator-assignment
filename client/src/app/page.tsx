"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { importLog } from "@/types/importLog";
import { Spinner } from "@/components/ui/spinner";

export default function ImportHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async (pageNumber = 1) => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:5021/api/import-logs?page=${pageNumber}&limit=10`,
    );
    const data = await res.json();
    setLogs(data.data);
    setPages(data.pages);
    setPage(data.page);
    setLoading(false);
  };

  const triggerImport = async () => {
    try {
      setLoading(true);
      await fetch("http://localhost:5021/api/import");
      fetchLogs(1);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(1);
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className=" flex items-center text- gap-2 font-bold">
          <span className="text-3xl">Admin</span>
          <span className="text-3xl">|</span>
          <span className="text-xl">Job Importing Dashboard</span>
        </h1>
        <Button onClick={triggerImport} disabled={loading}>
          {loading ? <Spinner /> : null}
          <span className="">Trigger Import</span>
        </Button>
      </div>

      <div className=" overflow-hidden border-2 rounded-xl border-violet-500  pt-3 pb-1">
        <Table>
          <TableHeader>
            <TableRow className="text-xl pr-4 pl-4">
              <TableHead>Source</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>New</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Failed</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log: importLog) => (
              <TableRow key={log._id} className="pr-2 pl-2">
                <TableCell>{log.fileName}</TableCell>
                <TableCell>{log.totalFetched}</TableCell>
                <TableCell className="text-green-600">{log.newJobs}</TableCell>
                <TableCell className="text-blue-600">
                  {log.updatedJobs}
                </TableCell>
                <TableCell className="text-red-600">{log.failedJobs}</TableCell>
                <TableCell>
                  {new Date(log.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <Button disabled={page === 1} onClick={() => fetchLogs(page - 1)}>
          Previous
        </Button>

        <span>
          Page {page} of {pages}
        </span>

        <Button disabled={page === pages} onClick={() => fetchLogs(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
