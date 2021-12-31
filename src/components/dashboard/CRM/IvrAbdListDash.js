import React from "react";
import DataTable from 'react-data-table-component';
import UserApi from "./UserApi";
import { useState, useEffect } from 'react'
import Auxiliary from "util/Auxiliary";
import { ExportToCsv } from 'export-to-csv';
import { Button, Form, Input, Select } from "antd";
import MonitorApi from "./MonitorApi";

// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }, { id: 2, title: 'priya', year: '1983' }];





// class Demodatatables extends React.Component {
function IvrAbdListDash() {

    let [historyList, setHistoryList] = useState();
    const datax = [];


    const columns = [
        {
            name: 'Phone Number',
            selector: 'phoneNumber',
            sortable: true,
        },
        {
            name: 'Start Time',
            selector: 'startDate',
            sortable: true,
            // right: true,
        },
        {
            name: 'End Time',
            selector: 'endDate',
            sortable: true,
            // right: true,
        },

        // {
        //     name: 'Extension',
        //     selector: 'extension',
        //     sortable: true,
        //     // right: true,
        // },
    ];


    useEffect(() => {
        var data = {
            extension: "sip",
        }
        MonitorApi.dashboardlist(data)
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.ivrAbandonedList).length - 1; i++) {
                    datax.push({
                        key: i,
                        phoneNumber: res.data.ivrAbandonedList[i].phoneNumber,
                        startDate: res.data.ivrAbandonedList[i].startDate,
                        endDate: res.data.ivrAbandonedList[i].endDate,
                        // extension: res.data.ivrAbandonedList[i].extension,
                    });
                }
                setHistoryList(datax);
            })

    }, []);


    const options = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Ivr Abandoned List',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Phone Number', 'Start Time', 'End Time'] //<-- Won't work with useKeysAsHeaders present!
    };


    //Excel Export
    const exportExcel = () => {
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(historyList);
    }
    //Excel Export

    return (

        <Auxiliary>

            <Button onClick={exportExcel}> Export </Button>

            <DataTable
                title="Ivr Abandoned List"
                columns={columns}
                data={historyList}
                pagination

            />

        </Auxiliary>
    );

};

export default IvrAbdListDash;