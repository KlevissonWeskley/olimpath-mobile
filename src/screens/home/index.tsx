import { Image, View } from 'react-native'
import { Header } from '../../components/header'
import { TodayQuiz } from '../../components/today-quiz'
import { CardGamification, Gamification, HomeContainer, OlympiadRecent } from './styles'
import { TextBase } from '../../components/text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import obmepLogo from '../../assets/obmep-logo.png'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigatiorRoutesProps } from '../../routes/home.stack'

export function Home() {
    const navigation = useNavigation<HomeNavigatiorRoutesProps>()

    const pontos = 50
    const total = 100
    const porcentagem = (pontos / total) * 100

    return (
        <HomeContainer>
            <Header />

            <TodayQuiz navigate={() => navigation.navigate('quiz')} />

            <View>
                <View style={{ marginBottom: 32 }}>
                    <TextBase variant='bold' size={24} color={COLORS.gray100}>Desempenho</TextBase>

                    <Gamification>
                        <CardGamification>
                            <MaterialCommunityIcons 
                                name='medal'
                                size={50}
                                color={COLORS.gold}
                            /> 

                            <TextBase color={COLORS.gold100} variant='semiBold' style={{ textAlign: 'center' }} size={20}>100°</TextBase>
                        </CardGamification>

                        <CardGamification>
                            <MaterialCommunityIcons 
                                name='star-circle'
                                size={50}
                                color={COLORS.gold}
                            /> 
                            
                            <TextBase color={COLORS.gold100} variant='semiBold' style={{ textAlign: 'center' }} size={20}>1.250</TextBase>
                        </CardGamification>

                        <CardGamification>
                            <MaterialCommunityIcons 
                                name='fire'
                                size={50}
                                color={COLORS.gray400}
                            /> 

                            <TextBase color={COLORS.gold100} variant='semiBold' style={{ textAlign: 'center' }} size={20}>5</TextBase>
                        </CardGamification>
                    </Gamification>
                </View>

                <View>
                    <TextBase variant='bold' size={24} color={COLORS.gray100}>Recentes</TextBase>

                    <View style={{ marginTop: 32 }}>
                        <OlympiadRecent>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image 
                                    source={obmepLogo}
                                    style={{ width: 70, height: 70, borderRadius: 6 }}
                                />
                                <TextBase variant='bold' color={COLORS.gray100}>OBMEP</TextBase>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <AnimatedCircularProgress
                                    size={70}
                                    width={8}
                                    fill={porcentagem}
                                    tintColor={COLORS.purple500}
                                    backgroundColor="#E0E0E0"
                                    rotation={0}
                                    lineCap="round"
                                >
                                    {() => (
                                        <TextBase variant="bold" style={{ textAlign: 'center' }} size={12} color={COLORS.gray100}>
                                            {`${pontos}/${total}`}
                                        </TextBase>
                                    )}
                                </AnimatedCircularProgress>
                            </View>
                        </OlympiadRecent>
                    </View>
                </View>
            </View>
        </HomeContainer>
    )
}