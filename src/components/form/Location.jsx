import React, { useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { setKey, setLanguage, setRegion, setLocationType, fromLatLng } from "react-geocode";
import Error from "./Error";
import { Controller } from "react-hook-form";

const Location = ({
    setPersonalAddress,
    setCity,
    setState,
    setPostal,
    setLocationInfo,
    register,
    control,
    errors,
    watch,
    setValue,
    registerVal,
}) => {
    const value = watch("addressContact");
    
    // Set API Key from environment or hardcoded as provided by user
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyBbubeKt-xGh-XJ4XDkbjsunTha2hPhEYM";
    
    setKey(API_KEY);
    setLanguage("en");
    setRegion("en"); 
    setLocationType("ROOFTOP");

    useEffect(() => {
        if (value?.label) {
            getLatAndLong(value?.label);
        }
    }, [value]);

    const getLatAndLong = async (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                fromLatLng(lat, lng).then(
                    (response) => {
                        const formattedAddress = response.results[0].formatted_address;
                        let city, state, postalcode, country, lga;

                        const components = response.results[0].address_components;
                        
                        // More robust mapping of address components
                        components.forEach(component => {
                            if (component.types.includes("locality")) city = component.long_name;
                            if (component.types.includes("administrative_area_level_1")) state = component.long_name;
                            if (component.types.includes("administrative_area_level_2")) lga = component.long_name;
                            if (component.types.includes("country")) country = component.long_name;
                            if (component.types.includes("postal_code")) postalcode = component.long_name;
                            
                            // Fallback for city if locality is not found
                            if (!city && component.types.includes("administrative_area_level_2")) city = component.long_name;
                        });

                        const data = {
                            latitude: lat,
                            city: city || "",
                            longitude: lng,
                            clearAddress: formattedAddress,
                            lga: lga || "",
                            state: state || "",
                            accuracy: formattedAddress,
                            postalcode: postalcode || "",
                        };

                        setLocationInfo(data);
                        setCity(data?.city);
                        setPersonalAddress(data?.accuracy);
                        // setValue('addressContact', '') // User snippet had this, might clear the input too soon?
                        setState(data?.state);
                        if (registerVal === undefined) {
                            setPostal(data.postalcode);
                        }
                    },
                    (error) => {
                        console.error("Geocode error:", error);
                        setCity("");
                        setPersonalAddress("");
                        setState("");
                        setLocationInfo({});
                        if (registerVal === undefined) {
                            setPostal("");
                        }
                    }
                );
            });
    };

    return (
        <div className="w-full">
            <Controller
                name={'addressContact'}
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                    <GooglePlacesAutocomplete
                        apiKey={API_KEY}
                        selectProps={{
                            ...field,
                            isDisabled: false,
                            placeholder: "Start typing your address...",
                            styles: {
                                control: (provided) => ({
                                    ...provided,
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    padding: '4px',
                                    fontSize: '14px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        border: '1px solid #1E4E82'
                                    }
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    color: '#0f172a'
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#0f172a'
                                })
                            }
                        }}
                    />
                )}
            />
            <Error errorName={errors.addressContact} />
        </div>
    );
};

export default Location;
