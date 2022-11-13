import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import { Image } from "cloudinary-react";
import SearchBox from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

async function uploadImage(
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? "");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });

  return response.json();
}

interface IUploadImageResponse {
  secure_url: string;
}

interface IFormData {
  venue: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  image: FileList;
}

interface IProps {}

function venueForm({}: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const { register, handleSubmit, setValue, errors, watch } =
    useForm<IFormData>({ defaultValues: {} });

  const address = watch("address");

  const [createSignature] =
    useMutation<CreateSignatureMutation>(SIGNATURE_MUTATION);

  useEffect(() => {
    register({ name: "venue" }, { required: "Please enter the venue" });
    register({ name: "capacity" }, { required: true, min: 1 });
    register({ name: "address" }, { required: "Please enter the address" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: {}) => {
    const { data: signatureData } = await createSignature();
    // console.log({ signatureData });
    if (signatureData) {
      // Create Image signature and upload image
      const { signature, timestamp } = signatureData.createImageSignature;
      console.log({ signature, timestamp });
      const imageData = await uploadImage(data.image[0], signature, timestamp);
      console.log(imageData);
      const imageUrl = imageData.secure_url;
    }
  };

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
    setSubmitting(false);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add Venue</h1>
      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for venue address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude);
            setValue("longitude", longitude);
          }}
          defaultValue=""
        />
        {errors.address && <p>{errors.address.message}</p>}
        <h2>{address}</h2>
      </div>
      {address && (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
            >
              Click to add venue image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={register({
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) return true;
                  return "Please upload an image";
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                    console.log(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                className="mt-4 object-cover"
                style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
              />
            )}
            {errors.image && <p>{errors.image.message}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="venue" className="block">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              id="venue"
              className="p-2"
              ref={register({
                required: "Please enter the venue name",
              })}
            />
            {errors.venue && errors.venue.message}
          </div>

          <div className="mt-4">
            <label htmlFor="capacity" className="block">
              Capacity
            </label>
            <input
              type="number"
              min={1}
              name="capacity"
              id="capacity"
              className="p-2"
              ref={register({
                required: "Please enter the venue capacity",
              })}
            />
            {errors.capacity && errors.capacity.message}
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
            <Link href="/">
              <a className="ml-4">Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
}

export default venueForm;
