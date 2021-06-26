import { IHandle } from '../../core/IHandle'
import { UserCreatedEvent } from './UserCreatedEvent'
import { DomainEvents } from '../../core/DomainEvents'
import { TestClass } from './TestClass'

// export const assignInitialUsername = () => {
//    console.log('🎈🎈🎈🎈🎈assigning initial username')
//    return 'annalise'
// }

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
   private testClass: TestClass

   constructor(testClass: TestClass) {
      this.testClass = testClass
      this.setupSubscriptions()
      // this.hi()
   }

   //  hi() {
   //     console.log(`✨✨✨✨✨✨✨Hi! My name is ${this.name}.`)
   //  }

   setupSubscriptions(): void {
      console.log('in user created setup subsriptions')
      DomainEvents.register(
         this.onUserCreatedEvent.bind(this) as any,
         UserCreatedEvent.name
      )
   }

   private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
      const { user } = event
      this.testClass.execute()
      console.log('in user created event', user)
   }
}
