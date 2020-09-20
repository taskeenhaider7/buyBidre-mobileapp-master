import React from 'react'
import Button, {Card, Avatar,Paragraph, DataTable, Searchbar} from 'react-native-paper'



const WIDTH = Math.round(Dimensions.get('window').width);
import Header, {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    SafeAreaView, TextInput, Linking
} from 'react-native'
import constants from "../Constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


class PropertyAgreement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate :new Date(),
            }
        }

    render() {

        return (
            <SafeAreaView style={styles.MainContainer}>
                <ScrollView style={{marginHorizontal:10}}>
                    <View >
                        <Text style={{marginTop:15, alignSelf:"center",fontSize:14,fontWeight:"bold"}}>BUYBIDRE PROPERTY PURCHASE AGREEMENT</Text>
                        <Text style={{alignSelf:"center"}}>_________________________________________</Text>
                        <Text style={{alignSelf:"center",marginTop:10,fontStyle:"italic"}}>THIS PROPERTY PURCHASE AGREEMENT (THIS "AGREEMENT")</Text>


                        <Text style={{alignSelf:"center" ,marginTop:7,fontWeight:"bold"}}>IS ENTERED INTO</Text>
                        <Text style={{alignSelf:"center" ,marginTop:7,fontWeight:"bold"}}>BY AND [BETWEEN]</Text>
                        <Text style={{alignSelf:"center" ,marginTop:7,fontWeight:"bold"}}>BUYERS</Text>
                        <Text style={{alignSelf:"center" ,marginTop:3,fontWeight:"bold",textDecorationLine:"underline"}}>Waqas Ahmed</Text>
                        <Text style={{alignSelf:"center" ,marginTop:3,fontWeight:"bold"}}>AND</Text>
                        <Text style={{alignSelf:"center" ,marginTop:7,fontWeight:"bold"}}>SELLER</Text>
                        <Text style={{alignSelf:"center" ,marginTop:3,fontWeight:"bold",textDecorationLine:"underline"}}>Asad</Text>
                        <Text style={{alignSelf:"center" ,marginTop:5,fontWeight:"bold",textDecorationLine:"underline"}}>123 W broad st Washington DC 20002</Text>
                        <Text style={{alignSelf:"center" ,marginTop:7,fontWeight:"bold",textDecorationLine:"underline"}}>[ADDRESS OF PROPERTY]</Text>
                        <Text style={{ marginTop:7, fontSize:11}}>Each Sellers and Buyers may be referred to in this Agreement individually as a "Party" and collectively as the "Parties."</Text>
                    </View>
                    <View >
                        <Text style={{marginTop:15, fontSize:12}}>BACKGROUND: For good value and consideration, the Sellers agrees to sell, and the Buyers agrees to buy the subject property (Sale of Property) described herein and the Buyers desires to purchase the Property offered for sale by Sellers under the conditions set forth in this agreement.

                            Now Therefore, in consideration of the mutual promises and for other good and valuable consideration exchanged by the Parties as set forth in this Agreement, the Parties, intending to be legally bound, hereby mutually agrees as follows:

                            Contractual Agreement: Buyers and Sellers agree that BuyBidRE.com will act as a Broker between both parties. The seller agree to pay BuyBidRE.com a settlement fee of $2,995.00 and buyer agree to pay an administrative fee of $995.00. Sellers(s) shall pay any additional compensation $_____________________ if offered by sellers to the buyers(s) agent and offered as part of the listing on this website

                            Sellers Representations and Warranties: Sellers represents and warrants that:

                            Sellers is the sole owner of record of the Property and has full right, power and authority to sell, convey and transfer the Property.
                            Sellers will convey to Buyers good and marketable title to the Property by providing to Buyers a valid general warranty deed.
                            The Property and the present use of the Property are not in violation of any governmental rules, codes, permits, regulations or limitations, and represents that nothing will be done or allowed to be done on or about the Property between the signing of this Agreement and the date of the Closing which will result in any such violation.
                            Any and all mortgage liens on the Property will have been released on the date of the Closing.
                            Sellers has no knowledge of the existence of any municipal lien and/or assessment.
                            Sellers is not a "foreign person" as defined in Section 1445(f) of the Internal Revenue Code of 1986, as amended.
                            Sellers has neither knowledge nor notice of any pending public agency hearings or appeals affecting the Property and will promptly notify Buyers if Sellers receives notice or learns of any such hearings between the signing of this Agreement and the date of the Closing.
                            Sellers is not a "debtor" in a proceeding presently in any bankruptcy court.
                            Sellers shall maintain the current insurance policy on the property until the Closing.
                            Sellers will notify Buyers immediately of any matters that may impact the Property, including, but not limited to, attachments, liens and any notice zoning matters.
                            Any material alterations, additions or improvements to the Property have been made pursuant to and in accordance with the necessary and required filings, permits, authorizations and/or consents.

                            Property: Sellers hereby agrees to sell and convey to Buyers, and Buyers hereby agrees to purchase from Sellers (the "Transaction"), all of Sellers's right, title and interest in the property located at _____________________ ____________________________ [street address, city, state], and the property Tax ID ____________________________

                            Purchase Price: The buyer agrees to pay a 1% of the purchase price as deposit within 3 days to a settlement company of their choice and inform seller and buybidre.com the name, address, phone number & contact person of the settlement company.

                            Taxes: The Buyers shall be responsible for ?ling all required sales and use tax returns in connection with the transfer of the Property. Buyers will also pay all required sales and use taxes and other transfer costs and expense which may arise resulting from the transfer of the Property. Sellers will pay all personal property taxes associated with ownership of the Property and accrued for the period ending on the Effective Date and buyers will pay all such personal property taxes that accrue thereafter.

                            Delivery: Buyers will be entitled to take possession of the Property after the execution of the sales contract and pay the remaining balance on the date of settlement which must be done within 45 days from signing this property purchase Agreement. If delivery is to be made before or after the Effectivity date, the Sellers shall ensure that the property is delivered in the same condition as when last inspected by Buyers.

                            Disclosures: Sellers shall provide Buyers with all disclosures, including signed disclosure agreements, as required by federal, state and local law. Sellers shall also disclose to Buyers in writing any defects in the Property known to Sellers that materially affects the value or quiet enjoyment of the Property. Buyers' obligations under this Agreement are contingent upon Buyers' review and approval of all required Sellers disclosures and reports, including any preliminary title report

                            Inspection: Buyers may use any inspectors of Buyers' choice, at Buyers' expense for information purpose only. Sellers shall cooperate in making the Property reasonably available for Buyers' inspection. A clean terminate certificate shall be given to buyer(s) before settlement.

                            Title Insurance: Buyers shall obtain, if he/she choose [Buyers'/Sellers's] expense, a title insurance policy (the "Title Policy") by a title insurance company selected by [Buyers/Sellers] which is authorized to do business in ______ [state where property is located] (the "Title Company")[./, subject only to:

                            Any and all restrictions, limitations, regulations, ordinances and/or laws imposed by any governmental authority and any and all other provisions of any governmental restrictions, limitations, regulations, ordinances and/or public laws.
                            Any liens for real property taxes or assessments created or attaching between the date of the Title Policy and the date the deed or instrument of transfer is recorded.
                            Any material defect, lien or encumbrance created, suffered, assumed or known by the Buyers.
                            Any rights of eminent domain.
                            Any claim under bankruptcy or other creditor;s rights laws that the transfer is a fraudulent conveyance. Etc.
                            Promptly after the date hereof, Buyers shall order a preliminary title report from the Title Company. Within 5 days of receiving the report, Buyers shall forward a copy of the report to Sellers and shall notify Sellers of any objections to title in the report or otherwise known to Buyers. Sellers shall have 5 days after receipt of Buyers; objections to correct or address the objections. If Sellers fails to correct or address the objections within the specified time period, Buyers shall have the right to terminate this F and be refunded any amounts previously paid under this Agreement.

                            Disputes: Any dispute arising from this Agreement shall be resolved in the courts of the State of Virginia USA through binding arbitration conducted in accordance with the rules of the American Arbitration Association/through mediation/through mediation. If the dispute cannot be resolved through mediation, then the dispute will be resolved through binding arbitration conducted in accordance with the rules of the American Arbitration Association].

                            Governing Law: The terms of this Agreement shall be governed by and construed in accordance with the laws of the State of Virginia United State of America not including its conflicts of law provisions.

                            Entire Agreement: This Agreement contains the entire understanding between the Parties and supersedes and cancels all prior Agreements of the Parties, whether oral or written, with respect to the subject matter.

                            Miscellaneous: This Agreement shall be binding upon the Parties and their respective heirs, successors, and assigns. The provisions of this Agreement are severable. If any provision is held to be invalid or unenforceable, it shall not affect the validity or enforceability of any other provision. The section headings are for reference purposes only and shall not otherwise affect the meaning, construction, or interpretation of ay provision of this Agreement. This Agreement constitutes the entire Agreement between the Parties and supersedes any and all prior oral or written Agreements or understandings between the Parties concerning the subject matter of this Agreement.

                            Disclaimer: This property purchase Agreement shall be binding and sets out general terms which the parties agree upon and shall be null and void if the state sales contract is not signed by the Sellers(s) and Buyers(s) within three (3) days from the date of this property purchase Agreement. Any changes from either the buyers(s) or the sellers(s) must be agreed upon by both parties or will be legally responsible for any damage(s) for breaking this Agreement under the state law which the property is located.

                            IN WITNESS WHEREOF, the parties hereto have executed this Agreement on</Text>

                    </View>
                    <View style={{marginTop:15}}
                    >
                        <Text style={{fontSize:14,marginTop:12}}>BUYER: ___________________________</Text>
                        <Text style={{fontSize:14,marginTop:12}}>Name: waqas ahmed</Text>
                        <Text style={{fontSize:14,marginTop:12}}>Signature ________________________</Text>
                        <Text style={{fontSize:14,marginTop:12}}>Date : {this.state.currentDate.toDateString()}</Text>
                        <Text style={{fontSize:14,marginTop:12}}>SELLER: ___________________________</Text>
                        <Text style={{fontSize:14,marginTop:12}}>Name: Asad </Text>
                        <Text style={{fontSize:14,marginTop:12}}>Signature ________________________</Text>
                        <Text style={{fontSize:14,marginTop:12}}>Date : {this.state.currentDate.toDateString()}</Text>

                    </View>
                    <View style={{flexDirection:"row",marginTop:20,marginBottom:10, justifyContent:"space-between"}}>
                        <Text style={{fontSize:10}}>Copyright © buybidre.com</Text>
                        <Text style={{fontSize:11,marginleft:12}}
                        onPress={()=>{
                            Linking.openURL('https://documentcloud.adobe.com/link/track?uri=urn%3Aaaid%3Ascds%3AUS%3A146cb0f1-c326-47fd-b320-b41922a8d7f3#pageNum=1');
                        }}
                        >Terms & Conditions | Privacy Policy</Text>
                    </View>




                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: "white",
        flex: 1,
    }
})
export default PropertyAgreement;
