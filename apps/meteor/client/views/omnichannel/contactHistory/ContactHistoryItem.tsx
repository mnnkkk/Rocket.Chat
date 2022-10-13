import {
	Message,
	Box,
	MessageGenericPreview,
	MessageGenericPreviewContent,
	MessageGenericPreviewDescription,
	MessageGenericPreviewTitle,
} from '@rocket.chat/fuselage';
import { VisitorSearchChatsResult } from '@rocket.chat/rest-typings';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import UserAvatar from '../../../components/avatar/UserAvatar';
import { useTimeAgo } from '../../../hooks/useTimeAgo';

type ContactHistoryItemProps = {
	history: VisitorSearchChatsResult;
	setChatId: Dispatch<SetStateAction<string>>;
};

function ContactHistoryItem({ history, setChatId }: ContactHistoryItemProps): ReactElement {
	const t = useTranslation();
	const formatDate = useTimeAgo();
	const username = history.servedBy?.username;
	console.log(history);
	const onClick = (): void => {
		setChatId(history._id);
	};

	return (
		<Message onClick={onClick} data-qa='chat-history-item'>
			<Message.LeftContainer>
				{username && <UserAvatar username={username} className='rcx-message__avatar' size='x36' />}
			</Message.LeftContainer>
			<Message.Container>
				<Message.Header>
					<Message.Name title={username}>{username}</Message.Name>
					{history.closingMessage?.ts && <Message.Timestamp>{formatDate(history.closingMessage?.ts)}</Message.Timestamp>}
				</Message.Header>
				<Message.Body>
					<MessageGenericPreview>
						<MessageGenericPreviewContent>
							<MessageGenericPreviewTitle>{t('Closing_chat_message')}:</MessageGenericPreviewTitle>
							<MessageGenericPreviewDescription clamp>
								<Box title={history.closingMessage?.msg}>{history.closingMessage?.msg}</Box>
							</MessageGenericPreviewDescription>
						</MessageGenericPreviewContent>
					</MessageGenericPreview>
				</Message.Body>
				<Message.Metrics>
					<Message.Metrics.Item>
						<Message.Metrics.Item.Icon name='thread' />
						<Message.Metrics.Item.Label>{history.msgs}</Message.Metrics.Item.Label>
					</Message.Metrics.Item>
				</Message.Metrics>
			</Message.Container>
		</Message>
	);
}

export default ContactHistoryItem;
