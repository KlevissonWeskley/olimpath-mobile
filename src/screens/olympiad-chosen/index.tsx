import { SafeAreaView } from "react-native-safe-area-context"
import { TextBase } from "../../components/text"
import { ScrollView, TouchableOpacity, View, Text, LayoutAnimation, UIManager, Platform } from "react-native"
import { COLORS } from "../../constants/colors"
import { useNavigation, useRoute } from "@react-navigation/native"
import { OlympiadsNavigatiorRoutesProps } from "../../routes/olympiads.stack"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react"
import { AccordionContainer, ButtonGenerateSimulation, OlympiadChosenContainer } from "./styles"
import { api } from "../../lib/axios"
import { ActivityIndicator } from "react-native-paper"

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

type OlympiadProps = {
  name: string,
  description: string,
  contents: [
    {
      id: string,
      title: string,
      videos: [
        {
          id: string,
          title: string,
          url: string,
        },
      ]
    },
  ]
}

type RouteParams = {
  olympiadId: string
}

export function OlympiadChosen() {
  const navigation = useNavigation<OlympiadsNavigatiorRoutesProps>()
  const route = useRoute()
  const { olympiadId } = route.params as RouteParams

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [checkedVideos, setCheckedVideos] = useState<string[]>([])
  const [olympiad, setOlympiad] = useState<OlympiadProps>()
  const [isLoading, setIsLoading] = useState(false)

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const toggleCheckbox = (link: string) => {
    if (checkedVideos.includes(link)) {
      setCheckedVideos(prev => prev.filter(item => item !== link))
    } else {
      setCheckedVideos(prev => [...prev, link])
    }
  }

  async function getOlympiad() {
    try {
      setIsLoading(true)
      const response = await api.get(`olympiads/getById/${olympiadId}`)

      setOlympiad(response.data.olympiad) 
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getOlympiad()
  }, [olympiad?.name])

  return (
    <OlympiadChosenContainer>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator /> 
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons 
                  name="arrow-left"
                  size={30}
                  color={COLORS.gray100}
                />
              </TouchableOpacity>
              <TextBase variant="bold" size={24} color={COLORS.gray100}>
                {olympiad?.name}
              </TextBase>
            </View>

            <View>
              <ButtonGenerateSimulation>
                <TextBase color={COLORS.white} variant="semiBold" style={{ textAlign: 'center' }}>Gerar Simulado</TextBase>
              </ButtonGenerateSimulation>
            </View>
          </View>

          {olympiad?.contents.map((module, index) => (
            <View key={module.title} style={{ marginBottom: 12 }}>
              <AccordionContainer
                onPress={() => toggleExpand(index)}
              >
                <TextBase color={COLORS.gray100} size={16}>{module.title}</TextBase>
                <Ionicons
                  name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={COLORS.gray100}
                />
              </AccordionContainer>

              {expandedIndex === index && (
                <View style={{ padding: 10, backgroundColor: COLORS.gray800, borderRadius: 6, marginTop: 4 }}>
                  {module.videos.map((video) => (
                    <View
                      key={video.url}
                      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                    >
                      <TouchableOpacity onPress={() => toggleCheckbox(video.url)} style={{ marginRight: 10 }}>
                        <Ionicons
                          name={checkedVideos.includes(video.url) ? 'checkbox' : 'square-outline'}
                          size={24}
                          color={COLORS.purple300}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => navigation.navigate('videoLesson', { linkVideo: video.url })}
                        style={{ flex: 1 }}
                      >
                        <TextBase size={14} color={COLORS.gray100}>{video.title}</TextBase>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </OlympiadChosenContainer>
  )
}
