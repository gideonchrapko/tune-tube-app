import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function DeleteAccount({
  handleDeleteAccount,
}: {
  handleDeleteAccount: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="py-3 px-6 rounded-lg bg-red-500 hover:bg-red-600 mb-12">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete your account and information
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SaveAccount({
  clickable,
  handleSave,
}: {
  clickable: string | File;
  handleSave: () => void;
}) {
  return (
    <>
      {clickable ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600">
              Save Changes
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to save these changes?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently change your settings
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button className="py-3 px-6 rounded-lg bg-gray-500 hover:bg-gray-600">
          Save Changes
        </Button>
      )}
    </>
  );
}
