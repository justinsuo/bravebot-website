import { redirect } from "next/navigation";

/**
 * The platform deep-dive has been merged into the single-page site.
 * This route now redirects to the homepage anchor.
 */
export default function ExplorePage() {
  redirect("/#anatomy");
}
