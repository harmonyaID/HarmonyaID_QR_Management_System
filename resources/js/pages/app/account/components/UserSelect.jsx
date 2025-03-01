const UserSelectTemplate = ({item}) => (
    <div 
        className="px-3 py-2 d-flex gap-3"
    >
        <div className="d-flex justify-content-center align-items-start flex-shrink-0">
            <div className="phone-search-flag-circle">
                <img 
                    src={item.flag}
                    alt={`${item.name} country flag`}
                />
            </div>
        </div>
    </div>
)