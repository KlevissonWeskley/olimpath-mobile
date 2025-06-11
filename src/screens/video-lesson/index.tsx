import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { OlympiadsStackProps } from "../../routes/olympiads.stack";
import { COLORS } from "../../constants/colors";

type VideoLessonRouteProp = RouteProp<OlympiadsStackProps, 'videoLesson'>

export function VideoLesson() {
    const route = useRoute<VideoLessonRouteProp>()
    const { linkVideo } = route.params

    const videoIdMatch = linkVideo.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]+)/)
    const videoId = videoIdMatch?.[1]

    const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0`

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray900 }}>
            <WebView 
                source={{ uri: embedUrl }} 
                style={{ flex: 1 }} 
                allowsFullscreenVideo
            />
        </SafeAreaView>
    )
}