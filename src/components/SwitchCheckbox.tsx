import { useFormContext } from "react-hook-form"

const SwitchCheckbox = (
  {
    text,
    name
  }: {
    text: string,
    name: string
  }
) => {
  const { register } = useFormContext();

  return (
    <fieldset className="fieldset text-gray-600 hover:text-gray-900">
      <label className="label">
        <input 
          type="checkbox" 
          defaultChecked 
          className="toggle bg-gray-500 checked:bg-base-100 transition-colors duration-200" 
          {...register(name)}
        />
        {text}
      </label>
    </fieldset>
  )
}

export default SwitchCheckbox