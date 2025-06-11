import { Modal, TouchableOpacity, View } from 'react-native'
import { useAuth } from '@clerk/clerk-expo'
import { COLORS } from '../../constants/colors'
import { TextBase } from '../text'
import { CancelButton, LogoutButton, ModalContainer, ModalContent } from './styles'

type ModalLogoutProps = {
    isModalVisible: boolean
    setIsModalVisible: (arg: boolean) => void
}

export function ModalLogout({ isModalVisible, setIsModalVisible }: ModalLogoutProps) {
    const { signOut } = useAuth()

    return (
        <Modal
            animationType="fade"
            transparent
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <ModalContainer>
                <ModalContent>
                    <View style={{ gap: 10 }}>
                        <TextBase variant='semiBold' size={16} style={{ textAlign: 'center' }} color={COLORS.gray100}>Deseja sair da conta?</TextBase>

                        <View style={{ gap: 20 }}>
                            <TouchableOpacity 
                                style={{ borderWidth: 2, borderColor: COLORS.red300, borderRadius: 6, padding: 5 }}
                                onPress={() => signOut()}
                            >
                                <LogoutButton>Sair</LogoutButton>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{ borderWidth: 2, borderColor: COLORS.gray100, borderRadius: 6, padding: 5 }}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <CancelButton>Cancelar</CancelButton>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}