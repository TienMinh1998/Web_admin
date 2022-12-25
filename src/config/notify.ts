import { toast, Bounce } from "react-toastify";

export const toastConfig = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 5000, // miliseconds or false
  icon: false,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  delay: 0,
  draggablePercent: 60,
  transition: Bounce, //( Slide, Zoom, Flip, Bounce)
  hideProgressBar: false,
};

// To solve problem duplicates toast, we use toastId
// ( Prevent duplicate ) toastId: "customId"   =>  A custom toastId can be used to replace the one generated. You can provide a number or a string

//*********Toast icon**************
// toast.info("Lorem ipsum dolor"); // same as toast(message, {type: "info"});
// toast.error("Lorem ipsum dolor");
// toast.success("Lorem ipsum dolor");
// toast.success("Lorem ipsum dolor", {
//   theme: "colored",
// });

//*********Handle promise**************
// const functionThatReturnPromise = () =>
//   new Promise((resolve) => setTimeout(resolve, 3000));
// toast.promise(functionThatReturnPromise, {
//   pending: "Promise is pending",
//   success: "Promise resolved 👌",
//   error: "Promise rejected 🤯",
// });

/* Other function: 
- toast.update
- toast.onChange
- toast.done
- define callback
- custom close button
- Replace the default transition 
- Render more than string ( type ReactNode)
- toast.dismiss
*/
