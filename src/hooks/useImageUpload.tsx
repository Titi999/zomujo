import { useEffect, useState, ChangeEvent, useRef, RefObject } from 'react';
import { FieldValues, UseFormSetValue, Path, PathValue } from 'react-hook-form';

interface UseImageUploadProps<T extends FieldValues> {
  setValue?: UseFormSetValue<T>;
  defaultImageUrl?: string | null;
  fieldName?: Path<T>;
}

interface UseImageUploadReturn {
  imageUrl: string | null;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetImage: () => void;
  imageRef: RefObject<HTMLInputElement | null>;
}

const useImageUpload = <T extends FieldValues = FieldValues>({
  setValue,
  defaultImageUrl = null,
  fieldName,
}: UseImageUploadProps<T> = {}): UseImageUploadReturn => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);

      if (setValue && fieldName) {
        setValue(fieldName, file as PathValue<T, Path<T>>, {
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    }
  };

  const resetImage = (): void => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
      if (setValue && fieldName) {
        setValue(fieldName, null as PathValue<T, Path<T>>);
      }
    }
  };

  useEffect(
    () => (): void => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    },
    [imageUrl],
  );

  return {
    imageUrl,
    handleImageChange,
    resetImage,
    imageRef,
  };
};

export default useImageUpload;
