import { useMemo,useState, useEffect } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';
import {
    RadioGroup,
    Stack,
  } from '@mui/material';



const DataTable = () => {
    const[data, setData]= useState([]);
    const [groupedColumnMode, setGroupedColumnMode] = useState('reorder');


    useEffect(()=>{
       
     getData();

    },[]);


    const getData=()=>{
        axios.get('https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1710756000000&signature=DmaAPnhO_oLnKIH4CSJOp75oWDhpFtP-rLmr3NNkO0s&downloadName=sample-data.json')
        .then(response =>{
            setData(response.data);
        })
        .catch(err =>{
            console.log("error",err);
        })
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', 
                header: 'id',
                size: 150,
            },
            {
                accessorKey: 'name', 
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
                accessorKey: 'createdAt', 
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
        data,
        enableGrouping: true,
        groupedColumnMode,
        initialState: {
          expanded: true,
        },


        columnFilterDisplayMode: 'custom', //we will render our own filtering UI
        enableFacetedValues: true,
        muiFilterTextFieldProps: ({ column }) => {
            return {
              label: column?.header || 'Filter',
            };
          },
        
    });

    return (
        <Stack gap="1rem">
        <RadioGroup
          aria-label="groupedColumnMode"
          name="groupedColumnMode"
          value={groupedColumnMode}
          onChange={(e) => setGroupedColumnMode(e.target.value)}
        >
        </RadioGroup>
        <MaterialReactTable table={table} />
      </Stack>
     
      );
};

export default DataTable;

