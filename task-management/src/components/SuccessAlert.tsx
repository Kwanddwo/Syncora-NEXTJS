import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

export function DialogSuccessAlert({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md flex flex-col items-center text-center">
                <DialogHeader>
                    <DialogTitle> Password Reset Successful </DialogTitle>
                    <DialogDescription>
                        Your password has been successfully reset. You can now log in with your new password.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full flex justify-center">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                            <Link href="/" >Back to Login</Link>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
