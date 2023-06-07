import { Button, LoadPanel, SelectBox, TextBox } from 'devextreme-react';
import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { URLCustonAction, configGetInitialMonthList, configGetYearList, configSaveMaster, getConfigFields, getHeaders, getUserToken } from '../../config/Config';
import { INumberBoxOptions } from 'devextreme-react/number-box';
import notify from 'devextreme/ui/notify';


export function Form() {
    const { token } = useContext(AppContext)
    const [userId, setUserId] = useState<any>()
    const [listYears, setListYears] = useState<any>([])
    const [listMonth, setListMonth] = useState<any>([])
    const [listCompanies, setListCompanies] = useState<any>([])

    const [selectedCompany, setSelectedCompany] = useState<number>(0)
    const [selectedInitialYear, setSelectedInitialYear] = useState<number>(0)
    const [selectedInitialMonth, setSelectedInitialMonth] = useState<number>(0)
    const [selectedFinalYear, setSelectedFinalYear] = useState<number>(0)
    const [selectedFinalMonth, setSelectedFinalMonth] = useState<number>(0)

    const type = [{ valor: 'C', descricao: 'Com Valor' }, { valor: 'S', descricao: 'Sem Valor' }]
    const [isLoadApi, setIsLoadApi] = useState(false)

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
        setIsLoadApi(true)
        axios.post(URLCustonAction, {}, getHeaders(token))
            .then((res: any) => {
                console.log("getCompanies", res.data)
                setListCompanies(res.data)
                    setSelectedCompany(res.data.filter((type:any)=>type.descricao.includes("Gerar"))[0].formulario)
            })
            .catch((err: any) => { console.log(err) })
            .finally(() => setIsLoadApi(false))
    }
    function getUserInfo() {
        setUserId(getUserToken(token).sub)
    }

    function handleCompany(e: React.PropsWithChildren<INumberBoxOptions>) {
        setSelectedCompany(e.value || 0)
    }
    function handleInitialMonth(e: React.PropsWithChildren<INumberBoxOptions>) {
        setSelectedInitialMonth(e.value || 0)
    }
    function handleFinalMonth(e: React.PropsWithChildren<INumberBoxOptions>) {
        setSelectedFinalMonth(e.value || 0)
    }
    function handleInitialYear(e: React.PropsWithChildren<INumberBoxOptions>) {
        setSelectedInitialYear(e.value || 0)
    }
    function handleFinalYear(e: React.PropsWithChildren<INumberBoxOptions>) {
        setSelectedFinalYear(e.value || 0)
    }

    async function saveForm() {
        try {
            setIsLoadApi(true)
            const response1 = await axios.request(configSaveMaster(selectedCompany, selectedFinalYear, selectedInitialYear, selectedFinalMonth, selectedInitialMonth, userId, token))
            console.log("==========================", response1)
            if (response1.status === 200) {
                notify("Enviado com sucesso!", "success", 6000)
            }
        } catch (error) {
            notify("Enviado com sucesso!", "error", 6000)
            console.error(error);
        } finally {
            setIsLoadApi(false)
        }
    };

    return (
        <section>
            <div className='menu-btn'>
                <i className="dx-icon-file menu-icon"></i>
                <h1>Gerar - Relatorio de Estoque e Vendas</h1>
            </div>
            <article >

                <div className='flex'>
                    <div className='field-column'>
                        <span>Mês inicial</span>
                        <SelectBox dataSource={listMonth} displayExpr={'DESCRICAO'} valueExpr='MES' value={selectedInitialMonth} onValueChanged={handleInitialMonth} />
                    </div>
                    <div className='field-column'>
                        <span>Mês final</span>
                        <SelectBox dataSource={listMonth} displayExpr={'DESCRICAO'} valueExpr='MES' value={selectedFinalMonth} onValueChanged={handleFinalMonth} />
                    </div>
                    <div className='field-column'>
                        <span>Ano inicial</span>
                        <SelectBox dataSource={listYears} displayExpr={'ANO'} valueExpr='ANO' value={selectedInitialYear} onValueChanged={handleInitialYear} />
                    </div>
                    <div className='field-column'>
                        <span>Ano final</span>
                        <SelectBox dataSource={listYears} displayExpr={'ANO'} valueExpr='ANO' value={selectedFinalYear} onValueChanged={handleFinalYear} />
                    </div>
                    <div className='field-column'>
                        <Button text='Gerar relatorio e enviar por email' onClick={saveForm} stylingMode='contained' type='default' icon='check' />
                    </div>
                </div>
            </article>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.1)"
                visible={isLoadApi}
                showIndicator={true}
                shading={true}
                showPane={true}
            />
        </section>

    )
}