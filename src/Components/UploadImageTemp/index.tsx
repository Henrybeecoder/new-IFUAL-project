import { ChangeEventHandler, useRef } from "react";
import { getInitials } from "../../../src/Custom hooks/helpers";
import styles from "./style.module.css";

interface Props {
  edit?: boolean;
  src?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  btnText: string;
  fallback?: string;
}

const UploadImageTemp = ({ edit, src, onChange, btnText, fallback }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {!src ? (
          <div className={styles.placeholder}>
            {!fallback ? (
              <p>Upload image</p>
            ) : (
              <h1>{getInitials({ name: fallback })}</h1>
            )}
          </div>
        ) : (
          <img src={src} alt={""} />
        )}
      </div>
      {!edit && (
        <>
          <input
            hidden
            ref={imageRef}
            type='file'
            accept='image/jpeg'
            onChange={onChange}
          />
          {/* TODO accept only jpeg file. Should convert or warn? */}
          <button
            type='button'
            onClick={() => imageRef.current && imageRef.current.click()}>
            {btnText}
          </button>
        </>
      )}
    </div>
  );
};

export default UploadImageTemp;
