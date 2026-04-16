import { Input } from "../ui/input";

export function FormInput({ field, ...props }: { field: any } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      name={field.name}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      {...props}
    />
  )
}

export function PasswordInput({ field, ...props }: { field: any } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      type="password"
      name={field.name}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      {...props}
    />
  )
}


export function FormTextArea({ field, ...props }: { field: any } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      name={field.name}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      placeholder="Message"
      rows={props.rows || 4}
      className="border text-gray-500 bg-gray-50 rounded-lg px-2 py-2 mb-3 w-full resize-none overflow-hidden"
      onInput={(e) => {
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      }}
    />
  )
}


export function FormSelectImages({ field, ...props }: { field: any } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      type="file"
      name={field.name}
      onChange={(e) => {
        if (!e.target.files) return;
        field.handleChange(e.target.files[0]);
      }}
      onBlur={field.handleBlur}
      {...props}
    />
  )
}
