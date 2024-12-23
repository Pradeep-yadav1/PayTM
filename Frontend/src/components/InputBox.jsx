export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 border-black">{label}</div>
      <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 rounded-md  border-solid border-2 border-black-400  bg-white  hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-400 ..."/>
    </div>
  );
}
