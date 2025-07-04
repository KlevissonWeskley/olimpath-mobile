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
import { useUser } from "@clerk/clerk-expo"
import { LoadingProgressModal } from "../../components/loading-progress-modal"

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

  const { user } = useUser()

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [olympiad, setOlympiad] = useState<OlympiadProps>()
  const [watchedVideos, setWatchedVideos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showProgress, setShowProgress] = useState(false)

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  function handleGenerateSimulado() {
    setShowProgress(true)
  }

  async function getOlympiad() {
    try {
      setIsLoading(true)
      const response = await api.get(`/olympiads/getById/${olympiadId}`)

      setOlympiad(response.data.olympiad) 
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchWatchedVideos(userId?: string) {
    try {
      const response = await api.get(`/users/${userId}/olympiads/${olympiadId}/watched`)
      setWatchedVideos(response.data.watchedVideos)
    } catch (err) {
      console.error('Erro ao buscar vídeos assistidos:', err)
    }
  } 

  async function markVideoAsWatched(videoId: string) {
    if (!user?.id) return

    try {
      await api.post(`/users/${user.id}/videos/${videoId}/view`)
      setWatchedVideos(prev => [...prev, videoId]) 
    } catch (err) {
      console.error('Erro ao marcar vídeo como assistido:', err)
    }
  }

  useEffect(() => {
    async function loadData() {
      await getOlympiad()
      await fetchWatchedVideos(user?.id)
    }

    loadData()
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
              <ButtonGenerateSimulation onPress={handleGenerateSimulado}>
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
                      <TouchableOpacity style={{ marginRight: 10 }}>
                        <Ionicons
                          name={watchedVideos.includes(video.id) ? 'checkbox' : 'square-outline'}
                          size={24}
                          color={COLORS.purple300}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={async () => {
                          await markVideoAsWatched(video.id)
                          navigation.navigate('videoLesson', { linkVideo: video.url })
                        }}
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

      <LoadingProgressModal
        visible={showProgress}
        onFinish={() => {
          setShowProgress(false)
          navigation.navigate('simulated', { olympiadId: olympiadId })
        }}
      />

    </OlympiadChosenContainer>
  )
}
