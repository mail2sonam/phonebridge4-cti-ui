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
function AnsweredListDash() {

    let [historyList, setHistoryList] = useState();
    const datax = [];


    const columns = [
        {
            name: 'Phone Number',
            selector: 'phoneNumber',
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: 'startDate',
            sortable: true,
            // right: true,
        },
        {
            name: 'End Date',
            selector: 'endDate',
            sortable: true,
            // right: true,
        },

        {
            name: 'Extension',
            selector: 'extension',
            sortable: true,
            // right: true,
        },
    ];


    useEffect(() => {
        var data = {
            extension: "sip",
        }
        MonitorApi.dashboardlist(data)
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.answeredList).length - 1; i++) {
                    datax.push({
                        key: i,
                        phoneNumber: res.data.answeredList[i].phoneNumber,
                        startDate: res.data.answeredList[i].startDate,
                        endDate: res.data.answeredList[i].endDate,
                        extension: res.data.answeredList[i].extension,
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
        title: 'Answered List',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Phone Number', 'Start Date', 'End Date', 'Extension'] //<-- Won't work with useKeysAsHeaders present!
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
                title="Answered List"
                columns={columns}
                data={historyList}
                pagination

            />

        </Auxiliary>
    );

};

export default AnsweredListDash;