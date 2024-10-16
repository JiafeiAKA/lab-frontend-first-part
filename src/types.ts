export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petAllowed: boolean
  organizer: Organizer
  images: string[]
}
export interface Organizer{
  id: number
  name: string
  roles: string[]
  image: string | null
}
export interface MessageState {
  message: string
}
export interface EventState {
  event: Event | null
}
export interface AuctionItem {
  id: number
  name: string
  description: string
  successfulBid: boolean
}
export interface AuctionItemState {
  auctionItem: AuctionItem | null
}