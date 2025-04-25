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
import {createWorkspaceAPI} from "@/app/_api/WorkspacesAPIs";
import {useWorkspaces} from "@/context/WorkspaceContext";
import {Workspace} from "@/types";
import EmojiSelector from "@/components/EmojiPicker";
import {toast} from "sonner";

export default function AddWorkspaceDialog() {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPersonal, setIsPersonal] = useState(false);
    const {setWorkspaces} = useWorkspaces();
    const [emoji, setEmoji] = useState("");

    const handleSubmit =async(e:React.FormEvent)=>{
        e.preventDefault();
        const name = nameRef.current?.value.trim();
        const description = descriptionRef.current?.value.trim();
        setLoading(true);
        if (!name) {
            toast.error("Name is required");
            setLoading(false);
            return;
        }
        const workspace ={
            name,
            description,
            isPersonal : isPersonal,
            icon : emoji,
        }
        try{
            const res = await createWorkspaceAPI(workspace);
            if(res && res.message === "Workspace created successfully") {
                const newWorkspace=res.workspace as Workspace;
                setLoading(false);
                setOpen(false);
                setWorkspaces((prev) => [...prev, newWorkspace]);
                toast.success("Workspace created successfully");
            }else {
                throw new Error("Workspace creation failed.");
            }
        }catch(error){
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
            setLoading(false);
        }

    }

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
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter workspace title" ref={nameRef} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter workspace description"
                                ref={descriptionRef}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="personal" className="cursor-pointer">
                                Personal {" "}
                            </Label>
                            <Switch id="personal" checked={isPersonal} onCheckedChange={setIsPersonal} />
                        </div>
                        <div className="flex items-center gap-2">
                            <EmojiSelector onSelectAction={setEmoji} />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSubmit}>
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
