export default function CustomTable() {
    return (
      <div className="flex justify-center p-4">
        <table className=" w-auto">
          <tbody>
            <tr>
              <td rowSpan={9} className="border-none rounded p-2 bg-secondary-400 font-bold shadow-custom-red">
                Programming Languages
              </td>
              <td className=" rounded-full p-2 bg-other-300/40 shadow-custom-dark text-white">React</td>
            </tr>
            {["Javascript", "Python", "R", "Shiny", "HTML", "CSS", "Tailwind", "JQuery"].map((item, index) => (
              <tr key={index}>
                <td className=" rounded-full p-2 bg-other-300/40 shadow-custom-dark text-white">{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }