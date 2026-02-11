import { redirect } from "next/navigation";

export default function MisspelledGalleryRedirect() {
  redirect("/gallery");
}
