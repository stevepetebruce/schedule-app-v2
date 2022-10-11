import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { Image } from "cloudinary-react";
// import { SearchBox } from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  venue: string,
  address: string,
  latitude: number,
  longitude: number,
  image: FileList
}

interface IProps {}

function venueForm({}: IProps) {
  const [submitting, setSubmitting] = useState(false)

  const {register, handleSubmit, setValue, errors, watch } = useForm<IFormData>({defaultValues: {}})

  useEffect(() => {
    register({ name: "venue" }, { required: "Please enter the venue" })
    register({ name: "address" }, { required: "Please enter the address" })
    register({ name: "latitude" }, { required: true, min: -90, max: 90 })
    register({ name: "longitude" }, { required: true, min: -180, max: 180 })

  }, [register])
  
  const onSubmit = (data: IFormData) => {
    setSubmitting(true)
    //handleCreate(data)
    //setSubmitting(false)
  }

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add Venue</h1>
      <div className="mt-4">
        <label htmlFor="search" className="block">Search for venue address</label>
        {/* Add Search field */}
        {errors.address && <p>{errors.address.message}</p>}
      </div>
    </form>
  )
}

export default venueForm
