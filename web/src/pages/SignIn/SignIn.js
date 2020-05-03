/* eslint-disable react/jsx-indent */
import React,{useRef, useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import Webcam from 'react-webcam'
import { toast } from 'react-toastify';
import { Container, Content, Background, Loading } from './styles';

import api from '../../services/api';

function SignIn() {
    const webcamRef = useRef(null);
    const [loader, setLoader] = useState(false);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user',
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoader(true);
        const imageSrc = webcamRef.current.getScreenshot();
        
        const response = await api.post('/face-recognition', {
            image: imageSrc
        });

        const {found} = response.data;

        if(found === true) {
            setLoader(false);
            toast.success('Autenticação realizada com sucesso!');
        } else {
            setLoader(false);
            toast.error('Usuário não cadastradio!');
        }
    }

    return (
        <Container>
            {loader === false ? (
                <Content>
                    <form onSubmit={handleSubmit}>
                        <h1>Faça seu Logon</h1>
                        <Webcam
                            audio={false}
                            height={400}
                            ref={webcamRef}
                            screenshotFormat='image/jpeg'
                            videoConstraints={videoConstraints}
                            width={300}
                        />
                        <button type="submit"> Entrar</button>
                    </form>

                    <a href="SignUp">
                        <FiLogIn />
                        Criar conta
                    </a>
                </Content>
            ): (<Loading />) 
            }
            <Background />
        </Container>
    );
};

export default SignIn;
