import { Alert, View } from "react-native";
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
            const redirectUrl = AuthSession.makeRedirectUri()

            const { createdSessionId, authSessionResult, signIn, signUp, setActive } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl,
            })

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
            }
        } catch (err) {
            console.error("Erro no login com Google:", JSON.stringify(err, null, 2))
            Alert.alert("Erro", "Não foi possível fazer login com o Google.")
        }
    }

    return (
        <LoginContainer>
            <View style={{ gap: 50 }}>
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
