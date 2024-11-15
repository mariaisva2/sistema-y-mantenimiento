"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import styles from "./Vehicles.module.scss";
import PageNavigation from '@/ui/molecules/PageNavigation/PageNavigation';
import { IAllVehiclesResponse, Metadata } from '@/app/core/application/dto';
import Section from '@/ui/molecules/Section/Section';
import Table from '@/ui/organisms/Vehicles/Table/TableVehicles';

interface IVehiclesProps {
  pagination: Metadata,
  data: IAllVehiclesResponse
}

const VehiclesTemplate = ({ data, pagination}: IVehiclesProps) => {


  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNext = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); 
    if(nextPage <= pagination.totalPages){
      params.set('page', nextPage.toString());
      router.push(`?${params.toString()}`); 
    }
  };

  const handlePrevious = (backPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if(backPage > 0){
      params.set('page', backPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const currentPage = pagination.currentPage;

  return (
    <div className={styles.div}>
      <div className={styles.contentWrapper }>
        <Section vehicle={null}/>
        <Table data={data}/>
      </div>
      <PageNavigation
        pagination={pagination}
        onNext={()=>handleNext(currentPage+1)}
        onPrevious={()=>handlePrevious(currentPage-1)}
      />
    </div>
  );
};

export default VehiclesTemplate;