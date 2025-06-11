import { Alert, Image, View } from "react-native";
import olimPathLogo from '../../assets/olim-path.png';
import { LoginContainer, GoogleButton, IconWrapper } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextBase } from "../../components/text";
import { COLORS } from "../../constants/colors";

import * as WebBrowser from 'expo-web-browser'
import { useEffect } from "react";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

export function Login() {
    const { startSSOFlow } = useSSO()

    useEffect(() => {
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, [])

    async function handleGoogleLogin() {
        try {
            const redirectUrl = 'https://app.olimpath.online/oauth/callback';

            Alert.alert(`redirect url: `, redirectUrl)

            const { createdSessionId, authSessionResult, signIn, signUp, setActive } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl,
            })

            if (createdSessionId) {
                setActive!({ session: createdSessionId })
            } else {

            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <LoginContainer>
            <View style={{ gap: 50 }}>
                {/* <View>
                    <Image 
                        source={olimPathLogo}
                        style={{ width: 200, height: 200 }}
                        resizeMode='contain'
                    />
                </View> */}

                <View>
                    <TextBase size={32} color={COLORS.purple200} variant="bold">Fazer login</TextBase>
                    <TextBase size={16} color={COLORS.gray300}>O caminho para a vitória começa com o primeiro passo</TextBase>
                </View>

                <GoogleButton activeOpacity={0.8} onPress={handleGoogleLogin}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconWrapper>
                            <MaterialCommunityIcons name="google" size={24} color="#fff" />
                        </IconWrapper>
                        <TextBase  color={COLORS.white} size={16}>Entrar com o Google</TextBase>
                    </View>
                </GoogleButton>
            </View>
        </LoginContainer>
    );
}
