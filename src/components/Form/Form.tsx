import { Button, SelectBox, TextBox } from 'devextreme-react';
import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { URLCustonAction, configGetInitialMonthList, configGetYearList, configSaveMaster, getConfigFields, getHeaders, getUserToken } from '../../config/Config';
import { INumberBoxOptions } from 'devextreme-react/number-box';


export function Form() {
    const { token } = useContext(AppContext)
    const [userId, setUserId] = useState<any>()
    const [listYears, setListYears] = useState<any>([])
    const [listMonth, setListMonth] = useState<any>([])
    const [listCompanies, setListCompanies] = useState<any>([])

    const [selectedInitialYear, setSelectedInitialYear] = useState<number>(0)
    const [selectedInitialMonth, setSelectedInitialMonth] = useState<number>(0)
    const [selectedFinalYear, setSelectedFinalYear] = useState<number>(0)
    const [selectedFinalMonth, setSelectedFinalMonth] = useState<number>(0)

    useEffect(() => {
        token && listMonth.length === 0 && getCompanies()
        token && listMonth.length === 0 && getMonth()
        token && listMonth.length === 0 && getYear()
        token && listMonth.length === 0 && getUserInfo()
    }, [token])


    function getMonth() {
        axios.request(configGetInitialMonthList(token))
            .then((response) => {
                setListMonth(response.data.data)
                console.log("getMonth", response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getYear() {
        axios.request(configGetYearList(token))
            .then((response) => {
                setListYears(response.data.data)
                console.log("getYear", response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function getCompanies() {
        axios.post(URLCustonAction, {}, getHeaders(token))
          .then((res: any) => {
            console.log(res.data)
            setListCompanies(res.data)
          })
          .catch((err: any) => { console.log(err) })
      }
    function getUserInfo() {
        setUserId(getUserToken(token).sub)
      }

    function handleInitialMonth(e: React.PropsWithChildren<INumberBoxOptions>){
        setSelectedInitialMonth(e.value||0)
    }
    function handleFinalMonth(e: React.PropsWithChildren<INumberBoxOptions>){
        setSelectedFinalMonth(e.value||0)
    }
    function handleInitialYear(e: React.PropsWithChildren<INumberBoxOptions>){
        setSelectedInitialYear(e.value||0)
    }
    function handleFinalYear(e: React.PropsWithChildren<INumberBoxOptions>){
        setSelectedFinalYear(e.value||0)
    }

    async function saveForm() {
        try {
            const response1 = await axios.request(configSaveMaster(selectedFinalYear,selectedInitialYear,selectedFinalMonth,selectedInitialMonth,userId,token))
            console.log("==========================", response1)
        } catch (error) {
            console.error(error);
        } 
    };

    return (
        <section>
            <h1>Gerar - Relatorio de Estoque e Vendas</h1>
            <article>
                <SelectBox label='Empresa' dataSource={listCompanies}  displayExpr="descricao" valueExpr= "formulario"/>
                <SelectBox label='Tipo de dado' />
                <SelectBox label='Mês inicial' dataSource={listMonth} displayExpr={'DESCRICAO'} valueExpr='MES' value={selectedInitialMonth} onValueChanged={handleInitialMonth}/>
                <SelectBox label='Mês final' dataSource={listMonth} displayExpr={'DESCRICAO'} valueExpr='MES'value={selectedFinalMonth} onValueChanged={handleFinalMonth}/>
                <SelectBox label='Ano inicial' dataSource={listYears} displayExpr={'ANO'} valueExpr='ANO'value={selectedInitialYear} onValueChanged={handleInitialYear}/>
                <SelectBox label='Ano final' dataSource={listYears} displayExpr={'ANO'} valueExpr='ANO'value={selectedFinalYear} onValueChanged={handleFinalYear}/>
                <Button text='Gerar relatorio e enviar por email' onClick={saveForm}/>
            </article>
        </section>

    )
}