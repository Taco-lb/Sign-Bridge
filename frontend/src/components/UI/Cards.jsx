import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
    display: flex;
    flex-direction: ${({ $flexDir }) => $flexDir || "column"};
    padding: 1.5rem;
    background-color: ${({ $bgColor }) => $bgColor || "var(--background-1)"};
    border-radius: 12px;
    flex: 1;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
    cursor: ${({ $clickable }) => $clickable ? "pointer" : "default"};
    transition: filter 0.3s ease-in-out;
    &:hover {
        filter: ${({$clickable}) => $clickable ? "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.7))" : "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))"};
        border-radius: 0.5rem;
        transition: filter 0.3s ease-in-out;

    }
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ $color }) => $color || "var(--main-color)"};
    align-self: ${({ $alignS }) => $alignS || "flex-start"};
    margin: ${({$margin}) => $margin === "no" ? "0" :  "0 0 1rem 0"};
    cursor: ${({ $clickable }) => $clickable ? "pointer" : "default"};
    transition: background-color 0.1s ease-in;

    &:hover {
        border-radius: 0.5rem;
        transition: background-color 0.1s ease-out;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const TopWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 1rem 0;
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const Title = styled.h3`
    color: var(--text-dark);
    font-size: 1.2rem;
    font-weight: 600;
    align-self: ${({ $alignS }) => $alignS || "flex-start"};
    margin: ${({ $margin }) => $margin === "no" ? "0" : " 0 0 1rem 0"};
`;

const Description = styled.p`
    color: var(--text-gray);
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    align-self: ${({ $alignS }) => $alignS || "flex-start"};
`;

const MainText = styled.h2`
    margin: 0;
    color: ${({ $color }) => $color || "var(--main-color)"};
`;

export default function Cards({ alignS, bgColor, icon: Icon, icons, iconHandlers, title, mainText, description, type, color, onClick, children }) {
    const renderCard = () => {
        switch (type) {
            case 'contact':
                return (
                    <CardContainer $bgColor={bgColor} $flexDir="row" style={{ gap: "1rem", padding: "2rem" }}>
                        <ContentWrapper>
                            <Title style={{ fontSize: "1.5rem" }}>{title}</Title>
                            <MainText $color={color}>{mainText}</MainText>
                            <Description>{description}</Description>
                            {children}
                        </ContentWrapper>
                    </CardContainer>
                );
            case 'lesson':
                return (
                    <CardContainer
                        $bgColor={bgColor}
                        $flexDir="row"
                        style={{ gap: "1rem" }}
                        onClick={onClick}
                        $clickable={!!onClick}
                        $hoverBg="rgba(0, 0, 0, 0.1)" 
                    >
                        <IconWrapper $alignS="center" $color={color} $margin="no">
                            <Icon size={32} strokeWidth={2} />
                        </IconWrapper>
                        <ContentWrapper>
                            <Title $margin="no">{title}</Title>
                            <MainText $color={color}>{mainText}</MainText>
                            <Description>{description}</Description>
                            {children}
                        </ContentWrapper>
                    </CardContainer>
                );
            case 'learn':
                return (
                    <CardContainer $bgColor={bgColor} $flexDir="row" style={{ gap: "1rem" }}>
                        <IconWrapper $alignS="center" $color={color} $margin="no">
                            <Icon size={32} strokeWidth={2} />
                        </IconWrapper>
                        <ContentWrapper>
                            <Title $margin="no">{title}</Title>
                            <MainText $color={color}>{mainText}</MainText>
                            <Description>{description}</Description>
                            {children}
                        </ContentWrapper>
                    </CardContainer>
                );
            case 'transcribe':
                return (
                    <CardContainer $bgColor={bgColor} $flexDir="row">
                        <ContentWrapper>
                            <TopWrapper>
                                <Title $margin="no">{title}</Title>
                                <ActionsContainer>
                                    {icons && icons.map((Icon, index) => (
                                        <IconWrapper
                                            key={index}
                                            $color={color}
                                            $alignS={"center"}
                                            $clickable={!!iconHandlers?.[index]}
                                            $hoverBg="rgba(0, 0, 0, 0.1)"
                                            onClick={iconHandlers?.[index]}
                                            style={{ padding: "0.25rem" }}
                                        >
                                            <Icon size={22} />
                                        </IconWrapper>
                                    ))}
                                </ActionsContainer>
                            </TopWrapper>
                            <Description>{description}</Description>
                            {children}
                        </ContentWrapper>
                    </CardContainer>
                );
            default:
                return (
                    <CardContainer $bgColor={bgColor}>
                        <IconWrapper $alignS={alignS}>
                            <Icon size={32} strokeWidth={2} />
                        </IconWrapper>
                        <Title $alignS={alignS}>{title}</Title>
                        <Description $alignS={alignS}>{description}</Description>
                        {children}
                    </CardContainer>
                );
        }
    };

    return renderCard();
}

Cards.propTypes = {
    bgColor: PropTypes.string,
    alignS: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.elementType,
    icons: PropTypes.arrayOf(PropTypes.elementType),
    iconHandlers: PropTypes.arrayOf(PropTypes.func),
    mainText: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
};