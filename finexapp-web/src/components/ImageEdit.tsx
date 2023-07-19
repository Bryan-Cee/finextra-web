// import React, { useRef } from 'react';
// import AvatarEditor from 'react-avatar-editor';

// const ImageEdit = () => {
//   const editor = useRef<AvatarEditor>(null);

//   const onClickSave = () => {
//     if (editor) {
//       // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
//       // drawn on another canvas, or added to the DOM.
//       const canvas = editor.current?.getImage();

//       // If you want the image resized to the canvas size (also a HTMLCanvasElement)
//       const canvasScaled = editor.current?.getImageScaledToCanvas();
//     }
//   };
//   return (
//     <div className="bg-red-200">
//       <AvatarEditor
//         image="http://picsum.photos/200"
//         width={300}
//         height={300}
//         color={[255, 255, 255, 0.8]} // RGBA
//         scale={0.8}
//         rotate={0}
//         ref={editor}
//         onPositionChange={(e: any) => {
//           console.log(e);
//         }}
//         borderRadius={200}
//       />
//     </div>
//   );
// };

// export default ImageEdit;
export {};
