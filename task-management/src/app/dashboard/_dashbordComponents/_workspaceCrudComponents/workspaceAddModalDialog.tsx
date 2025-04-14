"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {ClipLoader} from "react-spinners"
import {Plus} from "lucide-react";

export default function AddWorkspaceDialog() {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPersonal, setIsPersonal] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Plus className="h-8 w-8" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form>
                    <DialogHeader>
                        <DialogTitle>New Workspace</DialogTitle>
                        <DialogDescription>
                            Create or join a Workspace by filling out the form below.
                        </DialogDescription>
                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Name</Label>
                            <Input id="title" placeholder="Enter task title" ref={titleRef} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter task description"
                                ref={descriptionRef}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="personal" className="cursor-pointer">
                                Personal {" "}
                            </Label>
                            <Switch id="personal" checked={isPersonal} onCheckedChange={setIsPersonal} />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button" >
                            Create
                        </Button>
                    </DialogFooter>
                </form>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        {/* React spinner centered */}
                        <ClipLoader color="#00BFFF" size={50} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
