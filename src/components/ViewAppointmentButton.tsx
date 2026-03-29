"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // ✅ FIX
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ViewAppointmentButton({ data }: any) {
  const phone = data.phone || "";

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 px-3 text-xs sm:text-sm">
          View
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="w-[95%] sm:max-w-md rounded-xl">

        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Appointment Details
          </DialogTitle>

          {/* ✅ FIXED WARNING */}
          <DialogDescription>
            View patient information and contact details.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-4 text-sm">

          {/* 🔥 MOBILE RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">

            <div>
              <p className="text-muted-foreground text-xs">Name</p>
              <p className="font-medium">{data.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Email</p>
              <p className="font-medium wrap-break-word">{data.email}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Date</p>
              <p className="font-medium">{data.date}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Status</p>
              <Badge
                variant={
                  data.status === "approved"
                    ? "default"
                    : data.status === "completed"
                    ? "secondary"
                    : "outline"
                }
                className="capitalize mt-1"
              >
                {data.status}
              </Badge>
            </div>

            <div className="sm:col-span-2">
              <p className="text-muted-foreground text-xs">Message</p>
              <p className="font-medium wrap-break-word">
                {data.message || "N/A"}
              </p>
            </div>

          </div>

          {/* 🔥 ACTION BUTTONS (MOBILE FRIENDLY) */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">

            <a href={`tel:${phone}`} className="w-full">
              <Button className="w-full h-10 text-sm">
                📞 Call
              </Button>
            </a>

            <a
              href={`https://wa.me/91${phone}`}
              target="_blank"
              className="w-full"
            >
              <Button
                variant="secondary"
                className="w-full h-10 text-sm"
              >
                💬 WhatsApp
              </Button>
            </a>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}