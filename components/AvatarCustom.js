import { Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const AvatarNoSSR = dynamic(() => import("react-avatar-edit"), { ssr: false });

export const UploadAvatar = ({ setImagen, setnuevaIMG }) => {
  const [src, setSrc] = useState("");

  const [preview, setPreview] = useState("");
  const [ancho, setAncho] = useState(400);

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view) => {
    setPreview(view);
  };

  useEffect(() => {
    if (preview) {
      const res = dataURLtoFile(preview, "perfil.png");
      console.log(res);
      setImagen(preview);
      setnuevaIMG(res);
    }
  }, [preview, setImagen, setnuevaIMG]);

  return (
    <>
      <AvatarNoSSR
        width={400}
        height={400}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
        label="seleccione una imagen chusca"
      ></AvatarNoSSR>
    </>
  );
};

/* 

      
*/
