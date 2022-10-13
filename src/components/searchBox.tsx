import { ChangeEvent } from "react";
import { FunctionComponent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface ISeachBoxProps {
  onSelectAddress: (
    address: string,
    longitude: number | null,
    latitude: number | null,
  ) => void;
  defaultValue: string
}

const libraries: Libraries = ["places"]

const SearchBox = ({onSelectAddress, defaultValue}: ISeachBoxProps) => {
  const {isLoaded, loadError} = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    libraries
  })

  if(!isLoaded) return null;

  if(loadError) return <div>Error Loading</div>

  return (
    <ReadySearchBox 
      onSelectAddress={onSelectAddress} 
      defaultValue={defaultValue} 
    />
  )
}

const ReadySearchBox = ({onSelectAddress, defaultValue}: ISeachBoxProps) => {
  const {
    ready, 
    value, 
    setValue, 
    suggestions: {status, data}, 
    clearSuggestions
  } = usePlacesAutocomplete({ debounce: 300, defaultValue})

  const handleSelect = async(address: string) => {
    console.log({address})
  }

  console.log({status, data})

  const handleChange = (e :ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if(e.target.value === "") {
      onSelectAddress("", null, null)
    }
  }

  return (
    <Combobox onSelect={handleSelect} >
      <ComboboxInput 
        id="search" 
        value={value} 
        onChange={handleChange} 
        disabled={!ready} 
        placeholder="Search Location"
        className="w-full p-2"
        autoComplete="off"
      />
    </Combobox>
  )
}

export default SearchBox