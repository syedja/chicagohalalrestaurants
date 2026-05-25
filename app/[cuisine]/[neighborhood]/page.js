import { restaurantPageSchema } from '@/app/lib/schema'
import restaurants from '../../data/restaurants.json'
import content from '../../data/content.json'
import Link from 'next/link'

const metaMap = {
  'pakistani|devon-ave':       { title: 'Best Halal Pakistani Restaurants on Devon Ave, Chicago', desc: "Discover the top halal Pakistani restaurants on Devon Ave — karahi, nihari, biryani, and fresh naan from Chicago's most authentic desi food street." },
  'pakistani|glendale-heights':{ title: 'Halal Pakistani Restaurants in Glendale Heights, IL', desc: 'Find halal Pakistani food in Glendale Heights, DuPage County. Biryani, karahi, and Indo-Pak favorites from trusted local restaurants near you.' },
  'pakistani|lombard':         { title: 'Halal Pakistani Restaurants in Lombard, IL', desc: 'Looking for halal Pakistani food in Lombard? Browse top-rated Pakistani restaurants serving karahi, biryani, and desi comfort food in DuPage County.' },
  'pakistani|bridgeview':      { title: 'Best Halal Pakistani Restaurants in Bridgeview, IL', desc: "Find halal Pakistani restaurants in Bridgeview, Illinois. Authentic karahi, biryani, and tandoori dishes from the southwest Chicago suburb's top spots." },
  'pakistani|oak-lawn':        { title: 'Halal Pakistani Restaurants in Oak Lawn, Chicago', desc: 'Craving halal Pakistani food in Oak Lawn? Browse restaurants serving authentic biryani, karahi, and seekh kebab in this southwest Chicago suburb.' },
  'pakistani|skokie':          { title: 'Halal Pakistani Restaurants in Skokie, IL', desc: "Find halal Pakistani food in Skokie, Illinois. Top-rated restaurants serving nihari, karahi, and fresh Pakistani bread near Chicago's North Shore." },
  'pakistani|naperville':      { title: 'Halal Pakistani Restaurants in Naperville, IL', desc: "Looking for halal Pakistani food in Naperville? Browse DuPage County's best Pakistani restaurants for biryani, karahi, and Indo-Pak fusion dishes." },
  'pakistani|schaumburg':      { title: 'Halal Pakistani Restaurants in Schaumburg, IL', desc: 'Find halal Pakistani restaurants in Schaumburg, Illinois. Authentic biryani, karahi, and seekh kebab from top-rated spots in the northwest suburbs.' },
  'pakistani|evanston':        { title: 'Halal Pakistani Restaurants in Evanston, IL', desc: 'Discover halal Pakistani food in Evanston. Browse restaurants near Northwestern University serving authentic karahi, biryani, and desi street food.' },
  'pakistani|logan-square':    { title: 'Halal Pakistani Restaurants in Logan Square, Chicago', desc: "Find halal Pakistani restaurants in Logan Square, Chicago. Authentic karahi, biryani, and Indo-Pak comfort food in one of Chicago's most vibrant neighborhoods." },
  'pakistani|hyde-park':       { title: 'Halal Pakistani Restaurants in Hyde Park, Chicago', desc: "Looking for halal Pakistani food near the University of Chicago? Browse Hyde Park's best Pakistani restaurants for biryani, karahi, and desi favorites." },
  'pakistani|orland-park':     { title: 'Halal Pakistani Restaurants in Orland Park, IL', desc: 'Find halal Pakistani food in Orland Park, Illinois. Browse southwest suburban restaurants serving authentic biryani, karahi, and tandoori dishes.' },
  'pakistani|chicago':         { title: 'Best Halal Pakistani Restaurants in Chicago, IL', desc: "Find the best halal Pakistani restaurants across Chicago. From Devon Ave's legendary desi strip to neighborhood gems — biryani, karahi, and more." },
  'indian|devon-ave':          { title: 'Best Halal Indian Restaurants on Devon Ave, Chicago', desc: "Explore halal Indian restaurants on Devon Ave — Hyderabadi biryani, thali platters, and South Indian dishes from Chicago's premier South Asian food corridor." },
  'indian|glendale-heights':   { title: 'Halal Indian Restaurants in Glendale Heights, IL', desc: 'Find halal Indian food in Glendale Heights, DuPage County. From refined curry dishes to quick-service Indian kitchens near the I-355 corridor.' },
  'indian|lombard':            { title: 'Halal Indian Restaurants in Lombard, IL', desc: 'Looking for halal Indian food in Lombard? Browse top restaurants serving butter chicken, biryani, and South Indian dishes in DuPage County.' },
  'indian|bridgeview':         { title: 'Halal Indian Restaurants in Bridgeview, IL', desc: 'Find halal Indian restaurants in Bridgeview, Illinois. Authentic curries, biryanis, and tandoori dishes from the southwest Chicago suburbs.' },
  'indian|oak-lawn':           { title: 'Halal Indian Restaurants in Oak Lawn, Chicago', desc: 'Craving halal Indian food in Oak Lawn? Browse restaurants serving butter chicken, biryani, and fresh naan in this southwest Chicago suburb.' },
  'indian|skokie':             { title: 'Halal Indian Restaurants in Skokie, IL', desc: "Find halal Indian food in Skokie, Illinois. Top-rated restaurants serving Hyderabadi biryani, curry, and tandoori dishes near Chicago's North Shore." },
  'indian|naperville':         { title: 'Halal Indian Restaurants in Naperville, IL', desc: "Looking for halal Indian food in Naperville? Browse DuPage County's best Indian restaurants for biryani, curry, and South Indian favorites." },
  'indian|schaumburg':         { title: 'Halal Indian Restaurants in Schaumburg, IL', desc: 'Find halal Indian restaurants in Schaumburg, Illinois. Biryani, curry, and tandoori dishes from top-rated spots in the northwest Chicago suburbs.' },
  'indian|evanston':           { title: 'Halal Indian Restaurants in Evanston, IL', desc: "Discover halal Indian food in Evanston near Northwestern University. Authentic biryani, curry, and thali options from the North Shore's best spots." },
  'indian|logan-square':       { title: 'Halal Indian Restaurants in Logan Square, Chicago', desc: "Find halal Indian restaurants in Logan Square, Chicago. Curry, biryani, and South Indian dishes in one of Chicago's most food-forward neighborhoods." },
  'indian|hyde-park':          { title: 'Halal Indian Restaurants in Hyde Park, Chicago', desc: 'Looking for halal Indian food near University of Chicago? Browse Hyde Park restaurants serving Hyderabadi biryani, curry, and authentic Indian dishes.' },
  'indian|orland-park':        { title: 'Halal Indian Restaurants in Orland Park, IL', desc: 'Find halal Indian food in Orland Park, Illinois. Southwest suburban restaurants serving butter chicken, biryani, and tandoori favorites.' },
  'indian|chicago':            { title: 'Best Halal Indian Restaurants in Chicago, IL', desc: "Find the best halal Indian restaurants across Chicago. From Devon Ave's Hyderabadi biryani to neighborhood curry houses — authentic Indian food near you." },
  'mediterranean|devon-ave':   { title: 'Halal Mediterranean Restaurants on Devon Ave, Chicago', desc: "Find halal Mediterranean food on Devon Ave, Chicago. Shawarma, falafel, hummus, and grilled meats from top-rated spots on Chicago's desi food corridor." },
  'mediterranean|glendale-heights': { title: 'Halal Mediterranean Restaurants in Glendale Heights', desc: 'Browse halal Mediterranean restaurants in Glendale Heights, IL. Fresh shawarma, kebabs, and mezze platters in the heart of DuPage County.' },
  'mediterranean|lombard':     { title: 'Halal Mediterranean Restaurants in Lombard, IL', desc: 'Find halal Mediterranean food in Lombard, Illinois. Shawarma, grilled kebabs, and fresh mezze from top-rated DuPage County restaurants.' },
  'mediterranean|bridgeview':  { title: 'Halal Mediterranean Restaurants in Bridgeview, IL', desc: "Find halal Mediterranean restaurants in Bridgeview, Illinois. Shawarma, falafel, and grilled kebabs from the southwest Chicago suburb's top spots." },
  'mediterranean|oak-lawn':    { title: 'Halal Mediterranean Restaurants in Oak Lawn, Chicago', desc: 'Browse halal Mediterranean food in Oak Lawn, IL. Top restaurants serving shawarma, kebabs, and fresh Mediterranean dishes in the southwest suburbs.' },
  'mediterranean|skokie':      { title: 'Halal Mediterranean Restaurants in Skokie, IL', desc: "Find halal Mediterranean food in Skokie, Illinois. Shawarma, falafel, and mezze from top-rated restaurants near Chicago's North Shore." },
  'mediterranean|naperville':  { title: 'Halal Mediterranean Restaurants in Naperville, IL', desc: 'Looking for halal Mediterranean food in Naperville? Browse DuPage County restaurants serving shawarma, kebabs, and fresh Mediterranean dishes.' },
  'mediterranean|schaumburg':  { title: 'Halal Mediterranean Restaurants in Schaumburg, IL', desc: "Find halal Mediterranean restaurants in Schaumburg, IL. Shawarma, grilled kebabs, and mezze platters from northwest suburban Chicago's top spots." },
  'mediterranean|evanston':    { title: 'Halal Mediterranean Restaurants in Evanston, IL', desc: "Discover halal Mediterranean food in Evanston. Shawarma, falafel, and grilled kebabs near Northwestern University and Chicago's North Shore." },
  'mediterranean|logan-square':{ title: 'Halal Mediterranean Restaurants in Logan Square', desc: "Find halal Mediterranean restaurants in Logan Square, Chicago. Fresh shawarma, kebabs, and mezze in one of Chicago's most vibrant neighborhoods." },
  'mediterranean|hyde-park':   { title: 'Halal Mediterranean Restaurants in Hyde Park, Chicago', desc: 'Browse halal Mediterranean food near University of Chicago in Hyde Park. Shawarma, falafel, and grilled dishes close to campus.' },
  'mediterranean|orland-park': { title: 'Halal Mediterranean Restaurants in Orland Park, IL', desc: 'Find halal Mediterranean food in Orland Park, Illinois. Southwest suburban restaurants serving shawarma, kebabs, and fresh Mediterranean dishes.' },
  'mediterranean|chicago':     { title: 'Best Halal Mediterranean Restaurants in Chicago, IL', desc: 'Find the best halal Mediterranean restaurants across Chicago. Shawarma, falafel, kebabs, and mezze from top-rated spots citywide and in the suburbs.' },
  'middle-eastern|devon-ave':  { title: 'Halal Middle Eastern Restaurants on Devon Ave', desc: 'Find halal Middle Eastern food on Devon Ave, Chicago. Shawarma, kibbeh, hummus, and grilled meats from authentic Middle Eastern restaurants.' },
  'middle-eastern|glendale-heights': { title: 'Halal Middle Eastern Restaurants in Glendale Heights', desc: 'Browse halal Middle Eastern restaurants in Glendale Heights, IL. Gyros, shawarma, and Middle Eastern grills in DuPage County.' },
  'middle-eastern|lombard':    { title: 'Halal Middle Eastern Restaurants in Lombard, IL', desc: 'Find halal Middle Eastern food in Lombard, Illinois. Shawarma, gyros, and grilled kebabs from top DuPage County restaurants near you.' },
  'middle-eastern|bridgeview': { title: 'Halal Middle Eastern Restaurants in Bridgeview, IL', desc: 'Find halal Middle Eastern restaurants in Bridgeview, IL. Shawarma, falafel, and authentic Middle Eastern dishes in the southwest Chicago suburbs.' },
  'middle-eastern|oak-lawn':   { title: 'Halal Middle Eastern Restaurants in Oak Lawn, IL', desc: 'Browse halal Middle Eastern food in Oak Lawn, Chicago. Top-rated restaurants serving shawarma, kibbeh, and grilled Middle Eastern dishes.' },
  'middle-eastern|skokie':     { title: 'Halal Middle Eastern Restaurants in Skokie, IL', desc: "Find halal Middle Eastern food in Skokie, Illinois. Shawarma, falafel, and mezze from top restaurants near Chicago's North Shore suburbs." },
  'middle-eastern|naperville': { title: 'Halal Middle Eastern Restaurants in Naperville, IL', desc: 'Looking for halal Middle Eastern food in Naperville? Browse DuPage County restaurants serving shawarma, gyros, and authentic Middle Eastern dishes.' },
  'middle-eastern|schaumburg': { title: 'Halal Middle Eastern Restaurants in Schaumburg, IL', desc: "Find halal Middle Eastern restaurants in Schaumburg, IL. Shawarma, kebabs, and Middle Eastern grills from northwest suburban Chicago's top spots." },
  'middle-eastern|evanston':   { title: 'Halal Middle Eastern Restaurants in Evanston, IL', desc: "Discover halal Middle Eastern food in Evanston, Illinois. Shawarma, falafel, and authentic Middle Eastern dishes near Chicago's North Shore." },
  'middle-eastern|logan-square':{ title: 'Halal Middle Eastern Restaurants in Logan Square', desc: "Find halal Middle Eastern restaurants in Logan Square, Chicago. Authentic shawarma, kibbeh, and mezze in one of Chicago's liveliest neighborhoods." },
  'middle-eastern|hyde-park':  { title: 'Halal Middle Eastern Restaurants in Hyde Park', desc: 'Browse halal Middle Eastern food near University of Chicago in Hyde Park. Shawarma, falafel, and grilled Middle Eastern dishes close to campus.' },
  'middle-eastern|orland-park':{ title: 'Halal Middle Eastern Restaurants in Orland Park, IL', desc: 'Find halal Middle Eastern food in Orland Park, Illinois. Top southwest suburban restaurants serving shawarma, gyros, and Middle Eastern grills.' },
  'middle-eastern|chicago':    { title: 'Best Halal Middle Eastern Restaurants in Chicago', desc: 'Find the best halal Middle Eastern restaurants across Chicago and suburbs. Shawarma, kibbeh, hummus, and grilled meats from top-rated spots citywide.' },
  'turkish|devon-ave':         { title: 'Halal Turkish Restaurants on Devon Ave, Chicago', desc: "Find halal Turkish restaurants on Devon Ave, Chicago. Doner kebab, baklava, and authentic Turkish grills from top-rated spots on Chicago's desi corridor." },
  'turkish|glendale-heights':  { title: 'Halal Turkish Restaurants in Glendale Heights, IL', desc: 'Browse halal Turkish food in Glendale Heights, DuPage County. Doner kebab, Turkish pide, and grilled meats from local restaurants near you.' },
  'turkish|lombard':           { title: 'Halal Turkish Restaurants in Lombard, IL', desc: 'Find halal Turkish food in Lombard, Illinois. Authentic doner kebab, lahmacun, and Turkish grills from top DuPage County restaurants.' },
  'turkish|bridgeview':        { title: 'Halal Turkish Restaurants in Bridgeview, IL', desc: 'Find halal Turkish restaurants in Bridgeview, IL. Doner kebab, Turkish pide, and authentic grilled dishes from southwest Chicago suburb spots.' },
  'turkish|oak-lawn':          { title: 'Halal Turkish Restaurants in Oak Lawn, Chicago', desc: 'Browse halal Turkish food in Oak Lawn, IL. Top restaurants serving doner kebab, lahmacun, and authentic Turkish dishes in the southwest suburbs.' },
  'turkish|skokie':            { title: 'Halal Turkish Restaurants in Skokie, IL', desc: "Find halal Turkish food in Skokie, Illinois. Doner kebab, Turkish pide, and authentic grilled meats from top restaurants near Chicago's North Shore." },
  'turkish|naperville':        { title: 'Halal Turkish Restaurants in Naperville, IL', desc: 'Looking for halal Turkish food in Naperville? Browse DuPage County restaurants serving doner kebab, lahmacun, and authentic Turkish dishes.' },
  'turkish|schaumburg':        { title: 'Halal Turkish Restaurants in Schaumburg, IL', desc: "Find halal Turkish restaurants in Schaumburg, IL. Doner kebab, Turkish grills, and authentic dishes from northwest suburban Chicago's top spots." },
  'turkish|evanston':          { title: 'Halal Turkish Restaurants in Evanston, IL', desc: 'Discover halal Turkish food in Evanston, Illinois. Doner kebab, lahmacun, and authentic Turkish dishes near Northwestern University.' },
  'turkish|logan-square':      { title: 'Halal Turkish Restaurants in Logan Square, Chicago', desc: "Find halal Turkish restaurants in Logan Square, Chicago. Authentic doner kebab, pide, and Turkish grills in one of Chicago's most vibrant neighborhoods." },
  'turkish|hyde-park':         { title: 'Halal Turkish Restaurants in Hyde Park, Chicago', desc: 'Browse halal Turkish food near University of Chicago in Hyde Park. Doner kebab and authentic Turkish dishes close to campus.' },
  'turkish|orland-park':       { title: 'Halal Turkish Restaurants in Orland Park, IL', desc: 'Find halal Turkish food in Orland Park, Illinois. Southwest suburban restaurants serving doner kebab, lahmacun, and Turkish grilled dishes.' },
  'turkish|chicago':           { title: 'Best Halal Turkish Restaurants in Chicago, IL', desc: 'Find the best halal Turkish restaurants across Chicago and suburbs. Doner kebab, lahmacun, baklava, and authentic Turkish grills from top-rated spots.' },
  'lebanese|devon-ave':        { title: 'Halal Lebanese Restaurants on Devon Ave, Chicago', desc: "Find halal Lebanese food on Devon Ave, Chicago. Shawarma, kibbeh, tabbouleh, and Lebanese grills from authentic restaurants on Chicago's desi strip." },
  'lebanese|glendale-heights': { title: 'Halal Lebanese Restaurants in Glendale Heights, IL', desc: 'Browse halal Lebanese restaurants in Glendale Heights, DuPage County. Fresh shawarma, hummus, and Lebanese grilled meats near you.' },
  'lebanese|lombard':          { title: 'Halal Lebanese Restaurants in Lombard, IL', desc: 'Find halal Lebanese food in Lombard, Illinois. Shawarma, kibbeh, and fresh Lebanese mezze from top DuPage County restaurants.' },
  'lebanese|bridgeview':       { title: 'Halal Lebanese Restaurants in Bridgeview, IL', desc: 'Find halal Lebanese restaurants in Bridgeview, IL. Authentic shawarma, kibbeh, and Lebanese grills from southwest Chicago suburb spots.' },
  'lebanese|oak-lawn':         { title: 'Halal Lebanese Restaurants in Oak Lawn, Chicago', desc: 'Browse halal Lebanese food in Oak Lawn, IL. Top restaurants serving shawarma, tabbouleh, and Lebanese dishes in the southwest suburbs.' },
  'lebanese|skokie':           { title: 'Halal Lebanese Restaurants in Skokie, IL', desc: "Find halal Lebanese food in Skokie, Illinois. Shawarma, kibbeh, and authentic Lebanese mezze from top restaurants near Chicago's North Shore." },
  'lebanese|naperville':       { title: 'Halal Lebanese Restaurants in Naperville, IL', desc: 'Looking for halal Lebanese food in Naperville? Browse DuPage County restaurants serving shawarma, kibbeh, and authentic Lebanese dishes.' },
  'lebanese|schaumburg':       { title: 'Halal Lebanese Restaurants in Schaumburg, IL', desc: "Find halal Lebanese restaurants in Schaumburg, IL. Shawarma, kibbeh, and Lebanese grills from northwest suburban Chicago's top spots." },
  'lebanese|evanston':         { title: 'Halal Lebanese Restaurants in Evanston, IL', desc: 'Discover halal Lebanese food in Evanston, Illinois. Shawarma, tabbouleh, and authentic Lebanese dishes near Northwestern University.' },
  'lebanese|logan-square':     { title: 'Halal Lebanese Restaurants in Logan Square, Chicago', desc: "Find halal Lebanese restaurants in Logan Square, Chicago. Authentic shawarma, kibbeh, and Lebanese mezze in one of Chicago's best food neighborhoods." },
  'lebanese|hyde-park':        { title: 'Halal Lebanese Restaurants in Hyde Park, Chicago', desc: 'Browse halal Lebanese food near University of Chicago in Hyde Park. Shawarma and authentic Lebanese dishes close to campus.' },
  'lebanese|orland-park':      { title: 'Halal Lebanese Restaurants in Orland Park, IL', desc: 'Find halal Lebanese food in Orland Park, Illinois. Southwest suburban restaurants serving shawarma, kibbeh, and Lebanese grilled dishes.' },
  'lebanese|chicago':          { title: 'Best Halal Lebanese Restaurants in Chicago, IL', desc: 'Find the best halal Lebanese restaurants across Chicago and suburbs. Shawarma, kibbeh, hummus, and Lebanese grills from top-rated spots citywide.' },
  'fried-chicken|devon-ave':   { title: 'Halal Fried Chicken Restaurants on Devon Ave', desc: "Find halal fried chicken on Devon Ave, Chicago. Crispy, juicy halal chicken from top-rated spots on Chicago's most beloved South Asian food street." },
  'fried-chicken|glendale-heights': { title: 'Halal Fried Chicken in Glendale Heights, IL', desc: 'Browse halal fried chicken restaurants in Glendale Heights, DuPage County. Crispy halal chicken sandwiches, wings, and tenders near you.' },
  'fried-chicken|lombard':     { title: 'Halal Fried Chicken Restaurants in Lombard, IL', desc: 'Find halal fried chicken in Lombard, Illinois. Crispy halal chicken sandwiches, wings, and tenders from top DuPage County restaurants.' },
  'fried-chicken|bridgeview':  { title: 'Halal Fried Chicken in Bridgeview, IL', desc: 'Find halal fried chicken restaurants in Bridgeview, IL. Crispy halal wings, sandwiches, and tenders from southwest Chicago suburb spots.' },
  'fried-chicken|oak-lawn':    { title: 'Halal Fried Chicken Restaurants in Oak Lawn, IL', desc: 'Browse halal fried chicken in Oak Lawn, Chicago. Top restaurants serving crispy halal wings, sandwiches, and tenders in the southwest suburbs.' },
  'fried-chicken|skokie':      { title: 'Halal Fried Chicken Restaurants in Skokie, IL', desc: "Find halal fried chicken in Skokie, Illinois. Crispy halal wings, sandwiches, and tenders from top restaurants near Chicago's North Shore." },
  'fried-chicken|naperville':  { title: 'Halal Fried Chicken Restaurants in Naperville, IL', desc: "Looking for halal fried chicken in Naperville? Browse DuPage County's best spots for crispy halal wings, sandwiches, and chicken tenders." },
  'fried-chicken|schaumburg':  { title: 'Halal Fried Chicken Restaurants in Schaumburg, IL', desc: "Find halal fried chicken in Schaumburg, IL. Crispy halal wings, sandwiches, and tenders from northwest suburban Chicago's top spots." },
  'fried-chicken|evanston':    { title: 'Halal Fried Chicken Restaurants in Evanston, IL', desc: 'Discover halal fried chicken in Evanston, Illinois. Crispy halal wings, chicken sandwiches, and tenders near Northwestern University.' },
  'fried-chicken|logan-square':{ title: 'Halal Fried Chicken in Logan Square, Chicago', desc: "Find halal fried chicken restaurants in Logan Square, Chicago. Crispy halal wings, sandwiches, and tenders in one of Chicago's most vibrant neighborhoods." },
  'fried-chicken|hyde-park':   { title: 'Halal Fried Chicken in Hyde Park, Chicago', desc: 'Browse halal fried chicken near University of Chicago in Hyde Park. Crispy halal wings and chicken sandwiches close to campus.' },
  'fried-chicken|orland-park': { title: 'Halal Fried Chicken Restaurants in Orland Park, IL', desc: 'Find halal fried chicken in Orland Park, Illinois. Southwest suburban restaurants serving crispy halal wings, sandwiches, and tenders.' },
  'fried-chicken|chicago':     { title: 'Best Halal Fried Chicken Restaurants in Chicago', desc: 'Find the best halal fried chicken across Chicago and suburbs. Crispy wings, sandwiches, and tenders from top-rated halal spots citywide.' },
  'somali|devon-ave':          { title: 'Halal Somali Restaurants on Devon Ave, Chicago', desc: "Find halal Somali food on Devon Ave, Chicago. Bariis, suqaar, and authentic Somali dishes from top-rated restaurants on Chicago's diverse food corridor." },
  'somali|glendale-heights':   { title: 'Halal Somali Restaurants in Glendale Heights, IL', desc: 'Browse halal Somali restaurants in Glendale Heights, DuPage County. Authentic Somali rice dishes, suqaar, and grilled meats near you.' },
  'somali|lombard':            { title: 'Halal Somali Restaurants in Lombard, IL', desc: 'Find halal Somali food in Lombard, Illinois. Authentic bariis, suqaar, and Somali dishes from top DuPage County restaurants.' },
  'somali|bridgeview':         { title: 'Halal Somali Restaurants in Bridgeview, IL', desc: 'Find halal Somali restaurants in Bridgeview, IL. Authentic bariis iskukaris, suqaar, and Somali grilled meats in the southwest Chicago suburbs.' },
  'somali|oak-lawn':           { title: 'Halal Somali Restaurants in Oak Lawn, Chicago', desc: 'Browse halal Somali food in Oak Lawn, IL. Top restaurants serving authentic bariis, suqaar, and Somali dishes in the southwest suburbs.' },
  'somali|skokie':             { title: 'Halal Somali Restaurants in Skokie, IL', desc: "Find halal Somali food in Skokie, Illinois. Authentic Somali rice dishes and grilled meats from top restaurants near Chicago's North Shore." },
  'somali|naperville':         { title: 'Halal Somali Restaurants in Naperville, IL', desc: 'Looking for halal Somali food in Naperville? Browse DuPage County restaurants serving authentic bariis, suqaar, and Somali dishes.' },
  'somali|schaumburg':         { title: 'Halal Somali Restaurants in Schaumburg, IL', desc: 'Find halal Somali restaurants in Schaumburg, IL. Authentic Somali rice dishes, suqaar, and grilled meats from northwest suburban Chicago spots.' },
  'somali|evanston':           { title: 'Halal Somali Restaurants in Evanston, IL', desc: "Discover halal Somali food in Evanston, Illinois. Authentic bariis, suqaar, and Somali dishes near Northwestern University and Chicago's North Shore." },
  'somali|logan-square':       { title: 'Halal Somali Restaurants in Logan Square, Chicago', desc: "Find halal Somali restaurants in Logan Square, Chicago. Authentic bariis, suqaar, and Somali grilled meats in one of Chicago's most diverse neighborhoods." },
  'somali|hyde-park':          { title: 'Halal Somali Restaurants in Hyde Park, Chicago', desc: 'Browse halal Somali food near University of Chicago in Hyde Park. Authentic bariis and Somali dishes close to campus.' },
  'somali|orland-park':        { title: 'Halal Somali Restaurants in Orland Park, IL', desc: 'Find halal Somali food in Orland Park, Illinois. Southwest suburban restaurants serving authentic bariis, suqaar, and Somali dishes.' },
  'somali|chicago':            { title: 'Best Halal Somali Restaurants in Chicago, IL', desc: 'Find the best halal Somali restaurants across Chicago and suburbs. Authentic bariis, suqaar, and Somali grilled meats from top-rated spots citywide.' },
  'ethiopian|devon-ave':       { title: 'Halal Ethiopian Restaurants on Devon Ave, Chicago', desc: "Find halal Ethiopian food on Devon Ave, Chicago. Injera, tibs, and authentic Ethiopian stews from top-rated restaurants on Chicago's diverse food strip." },
  'ethiopian|glendale-heights':{ title: 'Halal Ethiopian Restaurants in Glendale Heights, IL', desc: 'Browse halal Ethiopian restaurants in Glendale Heights, DuPage County. Injera, tibs, and authentic Ethiopian dishes near you.' },
  'ethiopian|lombard':         { title: 'Halal Ethiopian Restaurants in Lombard, IL', desc: 'Find halal Ethiopian food in Lombard, Illinois. Injera, tibs, and authentic Ethiopian stews from top DuPage County restaurants.' },
  'ethiopian|bridgeview':      { title: 'Halal Ethiopian Restaurants in Bridgeview, IL', desc: 'Find halal Ethiopian restaurants in Bridgeview, IL. Authentic injera, tibs, and Ethiopian stews in the southwest Chicago suburbs.' },
  'ethiopian|oak-lawn':        { title: 'Halal Ethiopian Restaurants in Oak Lawn, Chicago', desc: 'Browse halal Ethiopian food in Oak Lawn, IL. Top restaurants serving injera, tibs, and authentic Ethiopian dishes in the southwest suburbs.' },
  'ethiopian|skokie':          { title: 'Halal Ethiopian Restaurants in Skokie, IL', desc: "Find halal Ethiopian food in Skokie, Illinois. Injera, tibs, and authentic Ethiopian stews from top restaurants near Chicago's North Shore." },
  'ethiopian|naperville':      { title: 'Halal Ethiopian Restaurants in Naperville, IL', desc: 'Looking for halal Ethiopian food in Naperville? Browse DuPage County restaurants serving injera, tibs, and authentic Ethiopian dishes.' },
  'ethiopian|schaumburg':      { title: 'Halal Ethiopian Restaurants in Schaumburg, IL', desc: "Find halal Ethiopian restaurants in Schaumburg, IL. Authentic injera, tibs, and Ethiopian stews from northwest suburban Chicago's top spots." },
  'ethiopian|evanston':        { title: 'Halal Ethiopian Restaurants in Evanston, IL', desc: 'Discover halal Ethiopian food in Evanston, Illinois. Injera, tibs, and authentic Ethiopian dishes near Northwestern University.' },
  'ethiopian|logan-square':    { title: 'Halal Ethiopian Restaurants in Logan Square, Chicago', desc: "Find halal Ethiopian restaurants in Logan Square, Chicago. Injera, tibs, and authentic Ethiopian stews in one of Chicago's most diverse neighborhoods." },
  'ethiopian|hyde-park':       { title: 'Halal Ethiopian Restaurants in Hyde Park, Chicago', desc: 'Browse halal Ethiopian food near University of Chicago in Hyde Park. Authentic injera and Ethiopian stews close to campus.' },
  'ethiopian|orland-park':     { title: 'Halal Ethiopian Restaurants in Orland Park, IL', desc: 'Find halal Ethiopian food in Orland Park, Illinois. Southwest suburban restaurants serving injera, tibs, and authentic Ethiopian dishes.' },
  'ethiopian|chicago':         { title: 'Best Halal Ethiopian Restaurants in Chicago, IL', desc: 'Find the best halal Ethiopian restaurants across Chicago and suburbs. Injera, tibs, and authentic Ethiopian stews from top-rated spots citywide.' },
  'american|devon-ave':        { title: 'Halal American Restaurants on Devon Ave, Chicago', desc: "Find halal American food on Devon Ave, Chicago. Halal burgers, wings, and comfort food from top-rated spots on Chicago's most diverse food street." },
  'american|glendale-heights': { title: 'Halal American Restaurants in Glendale Heights, IL', desc: 'Browse halal American food in Glendale Heights, DuPage County. Halal burgers, wings, and comfort food from local restaurants near you.' },
  'american|lombard':          { title: 'Halal American Restaurants in Lombard, IL', desc: 'Find halal American food in Lombard, Illinois. Halal burgers, wings, and comfort food from top DuPage County restaurants.' },
  'american|bridgeview':       { title: 'Halal American Restaurants in Bridgeview, IL', desc: 'Find halal American restaurants in Bridgeview, IL. Halal burgers, wings, and classic American comfort food in the southwest Chicago suburbs.' },
  'american|oak-lawn':         { title: 'Halal American Restaurants in Oak Lawn, Chicago', desc: 'Browse halal American food in Oak Lawn, IL. Top restaurants serving halal burgers, wings, and comfort food in the southwest suburbs.' },
  'american|skokie':           { title: 'Halal American Restaurants in Skokie, IL', desc: "Find halal American food in Skokie, Illinois. Halal burgers, wings, and classic comfort food from top restaurants near Chicago's North Shore." },
  'american|naperville':       { title: 'Halal American Restaurants in Naperville, IL', desc: "Looking for halal American food in Naperville? Browse DuPage County's best spots for halal burgers, wings, and American comfort food." },
  'american|schaumburg':       { title: 'Halal American Restaurants in Schaumburg, IL', desc: "Find halal American restaurants in Schaumburg, IL. Halal burgers, wings, and comfort food from northwest suburban Chicago's top spots." },
  'american|evanston':         { title: 'Halal American Restaurants in Evanston, IL', desc: 'Discover halal American food in Evanston, Illinois. Halal burgers, wings, and classic comfort food near Northwestern University.' },
  'american|logan-square':     { title: 'Halal American Restaurants in Logan Square, Chicago', desc: "Find halal American restaurants in Logan Square, Chicago. Halal burgers, wings, and comfort food in one of Chicago's most vibrant neighborhoods." },
  'american|hyde-park':        { title: 'Halal American Restaurants in Hyde Park, Chicago', desc: 'Browse halal American food near University of Chicago in Hyde Park. Halal burgers and comfort food close to campus.' },
  'american|orland-park':      { title: 'Halal American Restaurants in Orland Park, IL', desc: 'Find halal American food in Orland Park, Illinois. Southwest suburban restaurants serving halal burgers, wings, and American comfort food.' },
  'american|chicago':          { title: 'Best Halal American Restaurants in Chicago, IL', desc: 'Find the best halal American restaurants across Chicago and suburbs. Halal burgers, wings, and comfort food from top-rated spots citywide.' },
}

export async function generateStaticParams() {
  const combinations = []; const cuisines = [...new Set(restaurants.map(r => r.cuisine))]; cuisines.forEach(c => combinations.push({ cuisine: c, neighborhood: "chicago" }))
  const seen = new Set()
  for (const r of restaurants) {
    const key = `${r.cuisine}-${r.neighborhood}`
    if (!seen.has(key)) {
      seen.add(key)
      combinations.push({ cuisine: r.cuisine, neighborhood: r.neighborhood })
    }
  }
  return combinations
}

export async function generateMetadata({ params }) {
  const { cuisine, neighborhood } = await params
  const key = `${cuisine}|${neighborhood}`
  const meta = metaMap[key]
  if (meta) {
    return { title: meta.title, description: meta.desc }
  }
  const c = cuisine.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  const n = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  return {
    title: `Best Halal ${c} Restaurants in ${n}, Chicago`,
    description: `Find the top halal ${c} restaurants in ${n}, Chicago. Verified halal options with ratings and addresses.`,
  }
}

export default async function Page({ params }) {
  const { cuisine, neighborhood } = await params
  const c = cuisine.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  const n = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())

  const pageRestaurants = neighborhood === "chicago"
    ? restaurants.filter(r => r.cuisine === cuisine)
    : restaurants.filter(r => r.cuisine === cuisine && r.neighborhood === neighborhood)

  const intro = content[`${cuisine}|${neighborhood}`] || ''

  const schemas = restaurantPageSchema({ cuisine, neighborhood, restaurants: pageRestaurants })

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', margin: '1rem 0 0.5rem' }}>
        Best Halal {c} Restaurants in {n}, Chicago
      </h1>

      {intro && (
        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#444', marginBottom: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
          {intro}
        </p>
      )}

      {pageRestaurants.length === 0 ? (
        <p style={{ color: '#888' }}>No listings yet for this area — check back soon!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pageRestaurants.map((r, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px',
              padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{r.name}</h2>
              <p style={{ margin: '0 0 0.25rem', color: '#555', fontSize: '0.9rem' }}>📍 {r.address}</p>
              <p style={{ margin: '0 0 0.5rem', color: '#f59e0b', fontWeight: '600', fontSize: '0.9rem' }}>★ {r.rating} / 5</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#888' }}>
                {r.certified_halal ? '✅ Halal Certified' : ''} {r.family_friendly ? '· 👨‍👩‍👧 Family Friendly' : ''} {r.delivery_available ? '· 🚗 Delivery Available' : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '3rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 0.75rem', fontWeight: '600', color: '#15803d' }}>🍽️ Own a restaurant on this list?</p>
        <Link href="/advertise" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.6rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600'
        }}>
          Get Featured — $19/mo
        </Link>
      </div>

    </main>
  )
}
