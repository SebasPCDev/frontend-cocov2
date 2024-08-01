'use client';

import { useEffect } from 'react';
import CoworkingStatus from '../statusCoworking.tsx';
import EditAmenities from './CoworkingAmenities';
import EditCoworkingLocation from './coworkingLocation';
import CoworkingReceptionists from './coworkingReceptionists';
import ImagesContent from './imagesContent';
import useEdidtCoworking from './useEdidtCoworking';
import arrayCoworkingUbdateInfo from '@/utils/arraysforms/arrayCoworkingUbdateInfo';
import generateTimeOptions from '@/utils/timeoptions/generateTimeOptions';

export default function MyCoworkingDetailEdit({ id }: { id: string }) {
  const {
    handleClick,
    handleChange,
    coworking,
    onClickActivate,
    getData,
    arrayIdAmenities,
    setArrayIdAmenities,
  } = useEdidtCoworking({ id: id });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 bg-gray-100 py-4 text-center text-4xl font-bold">
        {coworking.name || 'Nombre del Coworking'}
      </h1>
      <div className="flex flex-col xl:flex-row">
        <div className="mt-4 max-h-[80vh] w-full overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:mt-0 xl:w-2/3">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="col-span-2 rounded-lg border p-4 shadow-sm xl:col-span-1">
              {arrayCoworkingUbdateInfo.map((info) => (
                <div key={info.name}>
                  {info.name === 'open' || info.name === 'close' ? (
                    <div className="mb-4 flex items-center">
                      <p className="w-1/3 pr-2">
                        <strong>{info.label}:</strong>
                      </p>
                      <select
                        id={info.name}
                        name={info.name}
                        required={info.required}
                        value={coworking[info.name].slice(0, 5) || ''}
                        onChange={handleChange}
                        className="block w-full rounded-lg border px-4 py-4 shadow focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">
                          {coworking[info.name] || '-- Seleccione --'}
                        </option>
                        {generateTimeOptions().map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="mb-4 flex items-center">
                      <p className="w-1/3 pr-2">
                        <strong>{info.label}:</strong>
                      </p>
                      <input
                        onChange={handleChange}
                        className="flex-grow rounded border bg-gray-100 p-2"
                        type={info.type}
                        value={coworking[info.name] || ''}
                        name={info.name}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div>
                <EditAmenities
                  arrayIdAmenities={arrayIdAmenities}
                  setArrayIdAmenities={setArrayIdAmenities}
                />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <p>
                  <strong>Estado:</strong>
                </p>
                <div className="flex items-center gap-4">
                  <CoworkingStatus status={coworking.status} />
                  {coworking.country &&
                    coworking.state &&
                    coworking.city &&
                    coworking.address &&
                    coworking.lat &&
                    coworking.long &&
                    coworking.thumbnail &&
                    coworking.status === 'pending' && (
                      <button
                        onClick={onClickActivate}
                        className="rounded-lg bg-red-500 p-2 text-white"
                      >
                        Activar
                      </button>
                    )}
                </div>
              </div>
            </div>
            <div>
              <EditCoworkingLocation coworking={coworking} />
              <button onClick={handleClick} className="btn btn-confirm">
                Actualizar Informacion
              </button>
            </div>

            <CoworkingReceptionists
              coworking={coworking}
              id={id}
              getData={getData}
            />
          </div>
        </div>
        {/* Contenedor 2 */}
        <ImagesContent coworking={coworking} getData={getData} />
      </div>
    </div>
  );
}
