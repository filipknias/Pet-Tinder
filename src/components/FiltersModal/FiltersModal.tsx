import React, { useState, useEffect, useRef } from 'react';
import "./filtersModal.scss";
import Modal from "../Modal/Modal";
import { Types } from "../../types/api";
import { Age, Filters } from "../../types/global";
import { useSelector } from "react-redux";
import AuthFeedback from '../AuthFormFeedback/AuthFeedback';
import axios from "axios";
import { PROXY_SERVER, LOCAL_STORAGE_FILTERS_KEY } from "../../types/constants";
import states from "../../assets/states.json";
import { RootState } from "../../redux/store";
import { formatErrorMessage } from "../../utilities/helpers";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersModal: React.FC<Props> = ({ open, setOpen }) => {
  const [availablePetTypes, setAvailablePetTypes] = useState<Types|null>(null);
  const [selectedPetType, setSelectedPetType] = useState<string|null>(null);
  const [filtersTypes, setFiltersTypes] = useState<Types[]>([]);
  const [typesLoading, setTypesLoading] = useState<boolean>(false);
  const [typesError, setTypesError] = useState<string|null>(null);
  const ageSelectRef = useRef<HTMLSelectElement|null>(null);
  const coatSelectRef = useRef<HTMLSelectElement|null>(null);
  const colorSelectRef = useRef<HTMLSelectElement|null>(null);
  const genderSelectRef = useRef<HTMLSelectElement|null>(null);
  const stateSelectRef = useRef<HTMLSelectElement|null>(null);
  const { filters } = useSelector((state: RootState) => state.petsReducer);

  const fetchFilterTypes = async () => {
    try {
      setTypesError(null);
      setTypesLoading(true);
      const { data } = await axios.get(`${PROXY_SERVER}/https://api.petfinder.com/v2/types`);
      setFiltersTypes(data.types);
      setSelectedPetType(data.types[0].name);
      setTypesLoading(false);
    } catch (err: any) {
      console.log(err);
      setTypesError(formatErrorMessage(err.code));
      setTypesLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterTypes();
  }, []);

  useEffect(() => {
    if (selectedPetType === null) return;
    // Set available filter types based on selected pet type
    const types = filtersTypes.find((filterType) => {
      return filterType.name === selectedPetType;
    });
    if (types) {
      setAvailablePetTypes(types);
    }
  }, [selectedPetType, filtersTypes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ageSelectRef.current === null ||
        coatSelectRef.current === null ||
        colorSelectRef.current === null ||
        genderSelectRef.current === null ||
        stateSelectRef.current === null
       ) return;
    
    if (selectedPetType === null) return;
    const filtersToSave: Filters = {
      age: ageSelectRef.current.value,
      coat: coatSelectRef.current.value,
      color: colorSelectRef.current.value,
      gender: genderSelectRef.current.value,
      location: stateSelectRef.current.value,
      type: selectedPetType,
    }

    localStorage.setItem(LOCAL_STORAGE_FILTERS_KEY, JSON.stringify(filtersToSave));
    setOpen(false);
  };  

  const capitalizeFirstLetter = (text: string): string => {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
  };  

  return (
    <Modal open={open} setOpen={setOpen} header="Filters">
      <form className="filtersForm" onSubmit={handleSubmit}>
        {typesError && (
          <AuthFeedback type="fail" message={typesError} />
        )}
        <div className="filtersForm__formGroup">
          <label htmlFor="type" className="filtersForm__formGroup__label">Type</label>
          <select 
            id="type" 
            className="filtersForm__formGroup__select"
            onChange={(e) => setSelectedPetType(e.target.value)}
            disabled={typesLoading ? true : false}
            defaultValue={filters ? filters.type : undefined}
          >
            {filtersTypes.map((type) => (
              <option value={type.name} key={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="age" className="filtersForm__formGroup__label">Age</label>
          <select 
            id="age" 
            className="filtersForm__formGroup__select" 
            disabled={typesLoading ? true : false}
            ref={ageSelectRef}
            defaultValue={filters ? filters.age : undefined}
          >
              <option value={Age.Baby}>{capitalizeFirstLetter(Age.Baby)}</option>
              <option value={Age.Young}>{capitalizeFirstLetter(Age.Young)}</option>
              <option value={Age.Adult}>{capitalizeFirstLetter(Age.Adult)}</option>
              <option value={Age.Senior}>{capitalizeFirstLetter(Age.Senior)}</option>
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="coat" className="filtersForm__formGroup__label">Coat</label>
          <select 
            id="coat" 
            className="filtersForm__formGroup__select" 
            disabled={typesLoading ? true : false} 
            ref={coatSelectRef}
            defaultValue={filters && filters.coat ? filters.coat : undefined}
          >
            {availablePetTypes && availablePetTypes.coats.map((coat) => (
              <option value={coat} key={coat}>
                {coat}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="color" className="filtersForm__formGroup__label">Color</label>
          <select 
            id="color" 
            className="filtersForm__formGroup__select" 
            disabled={typesLoading ? true : false}
            ref={colorSelectRef}
            defaultValue={filters ? filters.color : undefined}
          >
            {availablePetTypes && availablePetTypes.colors.map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="gender" className="filtersForm__formGroup__label">Gender</label>
          <select 
            id="gender" 
            className="filtersForm__formGroup__select" 
            disabled={typesLoading ? true : false}
            ref={genderSelectRef}
            defaultValue={filters ? filters.gender : undefined}
          >
            {availablePetTypes && availablePetTypes.genders.map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="state" className="filtersForm__formGroup__label">US State</label>
          <select 
            id="state" 
            className="filtersForm__formGroup__select" 
            disabled={typesLoading ? true : false}
            ref={stateSelectRef}
            defaultValue={filters ? filters.location : undefined}
          >
            {states.map((state) => (
              <option value={state.abbreviation} key={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="filtersForm__submit">Save filters</button>
      </form>
    </Modal>
  )
}

export default FiltersModal;