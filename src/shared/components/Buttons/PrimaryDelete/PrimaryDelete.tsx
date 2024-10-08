import React, { FC } from 'react';
import { Button, Col, Row } from 'antd';
import ModalWidget from '../../../../widgets/Layouts/ModalWidget/ModalWidget';

interface PrimaryDeleteProps {
    optionalTitle?: string;
    onClick: () => void;
}

/**
 * Компонент для удаления с подтверждением в виде модального окна.
 *
 * @component
 * @param {PrimaryDeleteProps} props - Свойства компонента.
 * @param {string} [props.optionalTitle] - Необязательный заголовок для модального окна и кнопки.
 * @param {() => void} props.onClick - Функция, вызываемая при подтверждении удаления.
 * @returns {FC} - Возвращает компонент кнопки, которая открывает модальное окно с подтверждением удаления.
 */
const PrimaryDelete: FC<PrimaryDeleteProps> = ({ optionalTitle, onClick }) => {
    // const {language} = useLanguageStore()
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <ModalWidget
                width={356}
                title={optionalTitle}
                centered
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={'header center'}>Вы уверены?</div>
                <div style={{ marginBottom: 32 }} />
                <Row gutter={[8, 0]} wrap={false} justify={'end'}>
                    <Col>
                        <Button
                            type={'text'}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Отмена
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type={'primary'}
                            danger
                            onClick={() => {
                                onClick();
                                setOpen(false);
                            }}
                        >
                            {optionalTitle ?? 'Удалить'}
                        </Button>
                    </Col>
                </Row>
            </ModalWidget>
            <Button danger type={'primary'} onClick={() => setOpen(true)}>
                {optionalTitle ?? 'Удалить'}
            </Button>
        </>
    );
};

export default PrimaryDelete;
