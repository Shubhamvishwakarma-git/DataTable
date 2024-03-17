import { useMemo,useState, useEffect } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';

const DataTable = () => {
    const[data, setData]= useState([]);
    // const[loading, setLoading]= useState(true);


    useEffect(()=>{
       
     getData();

    },[]);


    const getData=()=>{
        axios.get('https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1710756000000&signature=DmaAPnhO_oLnKIH4CSJOp75oWDhpFtP-rLmr3NNkO0s&downloadName=sample-data.json')
        .then(response =>{
            // console.log("data",response);
            setData(response.data);
            // setLoading(false);
        })
        .catch(err =>{
            console.log("error",err);
        })
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'id',
                size: 150,
            },
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'name',
                size: 150,
            },
            {
                accessorKey: 'category',
                header: 'category',
                size: 150,
            },
            {
                accessorKey: 'subcategory',
                header: 'subcategory',
                size: 150,
            },
            {
                accessorKey: 'createdAt', //normal accessorKey
                header: 'createdAt',
                size: 200,
            },
            {
                accessorKey: 'updatedAt',
                header: 'updatedAt',
                size: 150,
            },
            {
                accessorKey: 'price',
                header: 'price',
                size: 150,
            },
            {
                accessorKey: 'sale_price',
                header: 'sale_price',
                size: 150,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
       
        columnFilterDisplayMode: 'custom', //we will render our own filtering UI
        enableFacetedValues: true,
        muiFilterTextFieldProps: ({ column }) => ({
          label: `Filter by ${column.columnDef.header}`,
        }),
        
    });

    return <MaterialReactTable table={table} />;
};

export default DataTable;
