'use client';

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

export default function EditButton() {
  return (
    <Link href="/admin">
      <Button
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 p-0 z-50 cursor-pointer"
        size="icon"
      >
        <Edit className="h-5 w-5" />
      </Button>
    </Link>
  );
} 