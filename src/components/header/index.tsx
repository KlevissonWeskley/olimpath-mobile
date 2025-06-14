import { Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { HeaderContainer, UserInfo } from "./styles";
import { TextBase } from "../text";
import { COLORS } from "../../constants/colors";
import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { ModalLogout } from "../modal-logout";

export function Header() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { user } = useUser() 

    return (
        <HeaderContainer>
            <UserInfo>
                {user?.imageUrl ? (
                    <Image 
                        source={{ uri: user.imageUrl }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                ) : (
                    <MaterialCommunityIcons 
                        name="account-circle"
                        size={50}
                        color={COLORS.gray100}
                    />
                )}

                <TextBase variant="bold" size={22} color={COLORS.gray100}>{user?.firstName}</TextBase>
            </UserInfo>

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialCommunityIcons 
                    name="logout"
                    size={30}
                    color={COLORS.gray100}
                />
            </TouchableOpacity>

            <ModalLogout 
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </HeaderContainer>
    )
}