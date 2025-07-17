type Assign = "pending" | "inProgress" | "completed";
interface taskBody {
  title: string;
  description: string;
  assignStatus?: Assign;
}
export { taskBody, Assign };
