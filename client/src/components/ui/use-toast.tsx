import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      const options = {
        className: variant === "destructive" ? "destructive" : ""
      }
      
      sonnerToast(
        <div>
          {title && <div className="font-semibold">{title}</div>}
          {description && <div>{description}</div>}
        </div>,
        options
      )
    }
  }
}